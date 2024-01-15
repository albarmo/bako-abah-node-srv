const { Cart } = require("../../models");
const { validate } = require("uuid");

class CartController {
    static async createCart(req, res, next) {
        const {
            user_id,
            shipping_id,
            subtotal,
            discount,
            total_weight,
            grand_total,
            status,
            shipping_price,
        } = req.body;

        try {
            const response = await Cart.create({
                user_id,
                shipping_id,
                subtotal,
                discount,
                total_weight,
                grand_total,
                status,
                shipping_price,
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
            let data = await Cart.findAll();
            if (data) {
                return res
                    .status(200)
                    .json({ status: 200, message: "OK", data });
            } else {
                return res.status(500).json({
                    status: 500,
                    message: "Failed to get cart data",
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

        let data = await Cart.findOne({ where: { id: id } });
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

        const {
            user_id,
            shipping_id,
            subtotal,
            discount,
            total_weight,
            grand_total,
            status,
            shipping_price,
        } = req.body;

        try {
            const storeData = await Cart.findOne({
                where: {
                    id: id,
                },
                returning: true,
                plain: true,
            });

            if (storeData) {
                const updateResponse = await Cart.update(
                    {
                        user_id,
                        shipping_id,
                        subtotal,
                        discount,
                        total_weight,
                        grand_total,
                        status,
                        shipping_price,
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
                    .json({ status: 404, message: "cart not found!" });
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
            const deleteResponse = await Cart.destroy({
                where: { id: id },
                returning: true,
            });
            if (deleteResponse) {
                return res.status(200).json({
                    status: 200,
                    message: `Success delete cart with id ${id}`,
                });
            } else {
                return res.status(404).json({
                    status: 404,
                    message: `Failed, cart with id ${id} not found`,
                });
            }
        } catch (error) {
            return next(error);
        }
    }
}

module.exports = CartController;
