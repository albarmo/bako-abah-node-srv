const { Store } = require("../../models");
const { validate } = require("uuid");

class StoreController {
    static async getStoreList(req, res, next) {
        try {
            let data = await Store.findAll();
            if (data) {
                return res
                    .status(200)
                    .json({ status: 200, message: "OK", data });
            } else {
                return res.status(500).json({
                    status: 500,
                    message: "Failed to get store data",
                });
            }
        } catch (error) {
            return next(error);
        }
    }

    static async getStoreById(req, res, next) {
        const { id } = req.params;
        if (!validate(id)) {
            return res
                .status(400)
                .json({ status: 400, message: "Invalid UUID Format" });
        }

        let data = await Store.findOne({ where: { id: id } });
        try {
            if (data) {
                return res
                    .status(200)
                    .json({ status: 200, message: "OK", data });
            } else {
                return res
                    .status(500)
                    .json({ status: 500, message: "Failed get store data" });
            }
        } catch (error) {
            return next(error);
        }
    }

    static async createStore(req, res, next) {
        const {
            name,
            map_url,
            is_active,
            admin_phone_number,
            address,
            operational_hour,
        } = req.body;

        try {
            const response = await Store.create({
                name,
                map_url,
                is_active,
                admin_phone_number,
                address,
                operational_hour,
            });
            return res
                .status(201)
                .json({ status: 200, message: "OK", data: response });
        } catch (error) {
            return next(error);
        }
    }

    static async updateStore(req, res, next) {
        const { id } = req.params;

        if (!validate(id)) {
            return res
                .status(400)
                .json({ status: 400, message: "Invalid UUID Format" });
        }

        const {
            name,
            map_url,
            is_active,
            admin_phone_number,
            address,
            operational_hour,
        } = req.body;

        try {
            const storeData = await Store.findOne({
                where: {
                    id: id,
                },
                returning: true,
                plain: true,
            });

            if (storeData) {
                const updateResponse = await Store.update(
                    {
                        name,
                        map_url,
                        is_active,
                        admin_phone_number,
                        address,
                        operational_hour,
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
                    .json({ status: 404, message: "store not found!" });
            }
        } catch (error) {
            return next(error);
        }
    }

    static async deleteStore(req, res, next) {
        const { id } = req.params;
        if (!validate(id)) {
            return res
                .status(400)
                .json({ status: 400, message: "Invalid UUID Format" });
        }

        try {
            const deleteResponse = await Store.destroy({
                where: { id: id },
                returning: true,
            });
            if (deleteResponse) {
                return res.status(200).json({
                    status: 200,
                    message: `Success delete store with id ${id}`,
                });
            } else {
                return res.status(404).json({
                    status: 404,
                    message: `Failed, store with id ${id} not found`,
                });
            }
        } catch (error) {
            return next(error);
        }
    }
}

module.exports = StoreController;
