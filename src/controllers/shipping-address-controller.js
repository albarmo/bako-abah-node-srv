const { ShippingAddres, User } = require("../../models");
const { validate } = require("uuid");

class ShippingAddresController {
    static async createShippingAddress(req, res, next) {
        const {
            user_id,
            receiver_name,
            receiver_phone_number,
            label,
            address,
            province,
            city,
            district,
        } = req.body;
        try {
            const response = await ShippingAddres.create({
                user_id,
                receiver_name,
                receiver_phone_number,
                label,
                address,
                province,
                city,
                district,
            });
            return res
                .status(201)
                .json({ status: 200, message: "OK", data: response });
        } catch (error) {
            return next(error);
        }
    }

    static async getAllShippingAddress(req, res, next) {
        try {
            let data = await ShippingAddres.findAll({
                include: {
                    model: User,
                    as: "address_owner",
                    attributes: ["id", "first_name", "last_name"],
                },
            });
            if (data) {
                return res
                    .status(200)
                    .json({ status: 200, message: "OK", data });
            } else {
                return res.status(500).json({
                    status: 500,
                    message: "Failed to get data data",
                });
            }
        } catch (error) {
            return next(error);
        }
    }

    static async getShippingAddressById(req, res, next) {
        const { id } = req.params;
        if (!validate(id)) {
            return res
                .status(400)
                .json({ status: 400, message: "Invalid UUID Format" });
        }

        let data = await ShippingAddres.findOne({ where: { id: id } });
        try {
            if (data) {
                return res
                    .status(200)
                    .json({ status: 200, message: "OK", data });
            } else {
                return res
                    .status(500)
                    .json({ status: 500, message: "Failed get data" });
            }
        } catch (error) {
            return next(error);
        }
    }

    static async updateShippingAddress(req, res, next) {
        const { id } = req.params;

        if (!validate(id)) {
            return res
                .status(400)
                .json({ status: 400, message: "Invalid UUID Format" });
        }

        const {
            user_id,
            receiver_name,
            receiver_phone_number,
            label,
            address,
            province,
            city,
            district,
        } = req.body;

        try {
            const storeData = await ShippingAddres.findOne({
                where: {
                    id: id,
                },
                returning: true,
                plain: true,
            });

            if (storeData) {
                const updateResponse = await ShippingAddres.update(
                    {
                        user_id,
                        receiver_name,
                        receiver_phone_number,
                        label,
                        address,
                        province,
                        city,
                        district,
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
                    .json({ status: 404, message: "data not found!" });
            }
        } catch (error) {
            return next(error);
        }
    }

    static async deleteShippingAddress(req, res, next) {
        const { id } = req.params;
        if (!validate(id)) {
            return res
                .status(400)
                .json({ status: 400, message: "Invalid UUID Format" });
        }

        try {
            const deleteResponse = await ShippingAddres.destroy({
                where: { id: id },
                returning: true,
            });
            if (deleteResponse) {
                return res.status(200).json({
                    status: 200,
                    message: `Success delete data with id ${id}`,
                });
            } else {
                return res.status(404).json({
                    status: 404,
                    message: `Failed, data with id ${id} not found`,
                });
            }
        } catch (error) {
            return next(error);
        }
    }
}

module.exports = ShippingAddresController;
