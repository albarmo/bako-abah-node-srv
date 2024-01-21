const { CartItem, Product } = require("../../models");
const { validate } = require("uuid");

class CartItemController {
    static async createCart(req, res, next) {
        const { cart_id, product_id, subtotal, quantity } = req.body;

        try {
            const response = await CartItem.create({
                cart_id,
                product_id,
                subtotal,
                quantity,
            });
            return res
                .status(201)
                .json({ status: 200, message: "OK", data: response });
        } catch (error) {
            return next(error);
        }
    }

    static async getAllCart(req, res, next) {
        try {
            let data = await CartItem.findAll({
                include: {
                    model: Product,
                    as: "product",
                },
            });
            if (data) {
                return res
                    .status(200)
                    .json({ status: 200, message: "OK", data });
            } else {
                return res.status(500).json({
                    status: 500,
                    message: "Failed to get cart item data",
                });
            }
        } catch (error) {
            return next(error);
        }
    }

    static async getCartById(req, res, next) {
        const { id } = req.params;
        if (!validate(id)) {
            return res
                .status(400)
                .json({ status: 400, message: "Invalid UUID Format" });
        }

        let data = await CartItem.findOne({ where: { id: id } });
        try {
            if (data) {
                return res
                    .status(200)
                    .json({ status: 200, message: "OK", data });
            } else {
                return res
                    .status(500)
                    .json({ status: 500, message: "Failed get cart data" });
            }
        } catch (error) {
            return next(error);
        }
    }

    static async updateCart(req, res, next) {
        const { id } = req.params;

        if (!validate(id)) {
            return res
                .status(400)
                .json({ status: 400, message: "Invalid UUID Format" });
        }

        const { cart_id, product_id, subtotal, quantity } = req.body;

        try {
            const storeData = await CartItem.findOne({
                where: {
                    id: id,
                },
                returning: true,
                plain: true,
            });

            if (storeData) {
                const updateResponse = await CartItem.update(
                    {
                        cart_id,
                        product_id,
                        subtotal,
                        quantity,
                    },
                    {
                        where: {
                            id: id,
                        },
                        returning: true,
                    }
                );
                if (updateResponse) {
                    return res.status(200).json({
                        status: 200,
                        message: "OK",
                        data: updateResponse,
                    });
                }
            } else if (!storeData) {
                return res
                    .status(404)
                    .json({ status: 404, message: "cart item not found!" });
            }
        } catch (error) {
            return next(error);
        }
    }

    static async deleteCart(req, res, next) {
        const { id } = req.params;
        if (!validate(id)) {
            return res
                .status(400)
                .json({ status: 400, message: "Invalid UUID Format" });
        }

        try {
            const deleteResponse = await CartItem.destroy({
                where: { id: id },
                returning: true,
            });
            if (deleteResponse) {
                return res.status(200).json({
                    status: 200,
                    message: `Success delete cart item with id ${id}`,
                });
            } else {
                return res.status(404).json({
                    status: 404,
                    message: `Failed, cart item with id ${id} not found`,
                });
            }
        } catch (error) {
            return next(error);
        }
    }
}

module.exports = CartItemController;
