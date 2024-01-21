const { Product, Category, Sequelize } = require("../../models");
const { validate } = require("uuid");
const uploader = require("../helpers/uploader");
const { Op } = Sequelize;

class ProductController {
    static async createProduct(req, res, next) {
        const upload = uploader("PRODUCT_IMAGE").fields([{ name: "image" }]);
        try {
            upload(req, res, (err) => {
                if (err) {
                    return res.status(500).json({ msg: err });
                }
                const { image } = req.files;
                const imagePath = image ? "/" + image[0].filename : null;

                let inputData = {
                    category_id: req.body.category_id || null,
                    name: req.body.name,
                    description: req.body.description,
                    image: imagePath,
                    local_price: req.body.local_price,
                    international_prize: req.body.international_prize,
                    stock: req.body.stock,
                    weight: req.body.weight,
                    is_active: req.body.is_active,
                };

                Product.create(inputData)
                    .then((data) => {
                        return res.status(201).json({
                            status: 200,
                            message: "OK",
                            data: data,
                        });
                    })
                    .catch((error) => {
                        return res.status(500).json({
                            status: 500,
                            message: error,
                        });
                    });
            });
        } catch (error) {
            return next(error);
        }
    }

    static async getProductList(req, res, next) {
        let { filter, sort, page } = req.query;
        const paramQuerySQL = {};
        let limit;
        let offset;

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
            let data = await Product.findAll({
                ...paramQuerySQL,
                include: {
                    model: Category,
                    as: "category",
                    attributes: ["id", "name"],
                },
            });
            if (data) {
                return res
                    .status(200)
                    .json({ status: 200, message: "OK", data });
            } else {
                return res.status(500).json({
                    status: 500,
                    message: "Failed to get Product data",
                });
            }
        } catch (error) {
            return next(error);
        }
    }

    static async getProductById(req, res, next) {
        const { id } = req.params;
        if (!validate(id)) {
            return res
                .status(400)
                .json({ status: 400, message: "Invalid UUID Format" });
        }

        let data = await Product.findOne({ where: { id: id } });
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

    static async updateProduct(req, res, next) {
        const { id } = req.params;
        const upload = uploader("PRODUCT_IMAGE").fields([{ name: "image" }]);
        if (!validate(id)) {
            return res
                .status(400)
                .json({ status: 400, message: "Invalid UUID Format" });
        }
        try {
            const storeData = await Product.findOne({
                where: {
                    id: id,
                },
                returning: true,
                plain: true,
            });

            if (storeData) {
                upload(req, res, (err) => {
                    if (err) {
                        return res.status(500).json({ msg: err });
                    }
                    const { image } = req.files;
                    const imagePath = image ? "/" + image[0].filename : null;

                    let inputData = {
                        category_id: req.body.category_id || null,
                        name: req.body.name,
                        description: req.body.description,
                        image: imagePath,
                        local_price: req.body.local_price,
                        international_prize: req.body.international_prize,
                        stock: req.body.stock,
                        weight: req.body.weight,
                        is_active: req.body.is_active,
                    };

                    Product.update(inputData, {
                        where: {
                            id: id,
                        },
                        returning: true,
                    })
                        .then((data) => {
                            return res.status(200).json({ data });
                        })
                        .catch((error) => {
                            return res.status(500).json({ message: error });
                        });
                });
            } else if (!storeData) {
                return res
                    .status(404)
                    .json({ status: 404, message: "Product not found!" });
            }
        } catch (error) {
            return next(error);
        }
    }

    static async deleteProduct(req, res, next) {
        const { id } = req.params;
        if (!validate(id)) {
            return res
                .status(400)
                .json({ status: 400, message: "Invalid UUID Format" });
        }

        try {
            const deleteResponse = await Product.destroy({
                where: { id: id },
                returning: true,
            });
            if (deleteResponse) {
                return res.status(200).json({
                    status: 200,
                    message: `Success delete Product with id ${id}`,
                });
            } else {
                return res.status(404).json({
                    status: 404,
                    message: `Failed, Product with id ${id} not found`,
                });
            }
        } catch (error) {
            return next(error);
        }
    }
}

module.exports = ProductController;
