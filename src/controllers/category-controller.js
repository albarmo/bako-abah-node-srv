const { Category, Product, Sequelize } = require("../../models");
const { Op } = Sequelize;
const { validate } = require("uuid");

class CategoryController {
    static async createCategory(req, res, next) {
        const { name, is_active } = req.body;

        try {
            const response = await Category.create({
                name,
                is_active,
            });
            return res
                .status(201)
                .json({ status: 200, message: "OK", data: response });
        } catch (error) {
            return next(error);
        }
    }

    static async getCategoryList(req, res, next) {
        let { filter, sort, page } = req.query;
        const paramQuerySQL = {};
        let limit;
        let offset;

        console.log(filter);

        // filtering by category
        if (filter !== "" && typeof filter !== "undefined") {
            paramQuerySQL.where = {
                name: { [Op.iLike]: `%${filter}%` },
            };
        }
        // sorting
        if (sort !== "" && typeof sort !== "undefined") {
            let query;
            if (sort.charAt(0) !== "-") {
                query = [[sort, "ASC"]];
            } else {
                query = [[sort.replace("-", ""), "DESC"]];
            }

            paramQuerySQL.order = query;
        }

        // pagination
        if (page !== "" && typeof page !== "undefined") {
            if (page.size !== "" && typeof page.size !== "undefined") {
                limit = page.size;
                paramQuerySQL.limit = limit;
            }

            if (page.number !== "" && typeof page.number !== "undefined") {
                offset = page.number * limit - limit;
                paramQuerySQL.offset = offset;
            }
        } else {
            limit = 5;
            offset = 0;
            paramQuerySQL.limit = limit;
            paramQuerySQL.offset = offset;
        }

        try {
            let data = await Category.findAll({
                ...paramQuerySQL,
                include: {
                    model: Product,
                    as: "products",
                },
            });
            if (data) {
                return res
                    .status(200)
                    .json({ status: 200, message: "OK", data });
            } else {
                return res.status(500).json({
                    status: 500,
                    message: "Failed to get category data",
                });
            }
        } catch (error) {
            return next(error);
        }
    }

    static async getCategoryById(req, res, next) {
        const { id } = req.params;
        if (!validate(id)) {
            return res
                .status(400)
                .json({ status: 400, message: "Invalid UUID Format" });
        }

        let data = await Category.findOne({ where: { id: id } });
        try {
            if (data) {
                return res
                    .status(200)
                    .json({ status: 200, message: "OK", data });
            } else {
                return res
                    .status(500)
                    .json({ status: 500, message: "Failed get category data" });
            }
        } catch (error) {
            return next(error);
        }
    }

    static async updateCategory(req, res, next) {
        const { id } = req.params;

        if (!validate(id)) {
            return res
                .status(400)
                .json({ status: 400, message: "Invalid UUID Format" });
        }

        const { name, is_active } = req.body;

        try {
            const storeData = await Category.findOne({
                where: {
                    id: id,
                },
                returning: true,
                plain: true,
            });

            if (storeData) {
                const updateResponse = await Category.update(
                    {
                        name,
                        is_active,
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
                    .json({ status: 404, message: "category not found!" });
            }
        } catch (error) {
            return next(error);
        }
    }

    static async deleteCategory(req, res, next) {
        const { id } = req.params;
        if (!validate(id)) {
            return res
                .status(400)
                .json({ status: 400, message: "Invalid UUID Format" });
        }

        try {
            const deleteResponse = await Category.destroy({
                where: { id: id },
                returning: true,
            });
            if (deleteResponse) {
                return res.status(200).json({
                    status: 200,
                    message: `Success delete category with id ${id}`,
                });
            } else {
                return res.status(404).json({
                    status: 404,
                    message: `Failed, category with id ${id} not found`,
                });
            }
        } catch (error) {
            return next(error);
        }
    }
}

module.exports = CategoryController;
