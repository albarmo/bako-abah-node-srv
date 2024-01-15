const { Product } = require("../../models");
const { validate } = require("uuid");
const uploader = require("../helpers/uploader");

class ProductController {
    static create(req, res, next) {
        try {
            const upload = uploader("PRODUCT_IMAGE").fields([
                { name: "images" },
            ]);
            upload(req, res, (err) => {
                if (err) {
                    return res.status(500).json({ msg: err });
                }
                const { images } = req.files;
                const imagePath = images ? "/" + images[0].filename : null;

                let inputData = {
                    title: req.body.title,
                    color: req.body.color,
                    size: req.body.size,
                    description: req.body.description,
                    stock: req.body.stock,
                    images: imagePath,
                    price: req.body.price,
                    weight: req.body.weight,
                    CollectionId: req.body.CollectionId,
                };

                Product.create(inputData)
                    .then((data) => {
                        return res.status(201).json({ data });
                    })
                    .catch((error) => {
                        return res.status(500).json({ message: error });
                    });
            });
        } catch (error) {
            next(error);
        }
    }
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
        try {
            let data = await Product.findAll();
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
