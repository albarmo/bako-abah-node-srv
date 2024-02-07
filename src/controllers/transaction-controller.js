const { Transaction, Cart, Store, Sequelize } = require("../../models");
const {validate} = require( "uuid" );
const { Op } = Sequelize;

const fs = require("fs");
const uploader = require("../helpers/uploader-s3");
const AWS = require("aws-sdk");
AWS.config.update({
    accessKeyId: process.env.AWS_S3_ACCESS_KEY,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
    region: process.env.AWS_S3_REGION,
});
const s3 = new AWS.S3();

class TransactionController {
    static async createTransaction(req, res, next) {
        const {
            user_id,
            cart_id,
            amount,
            paid_amount,
            paid_at,
            proof_of_payment,
            payment_type,
            status,
            cardholder_name,
            store_in_charge,
        } = req.body;

        try {
            const response = await Transaction.create({
                user_id,
                cart_id,
                amount,
                paid_amount,
                paid_at,
                proof_of_payment,
                payment_type,
                status,
                cardholder_name,
                store_in_charge,
            });
            return res
                .status(201)
                .json({ status: 200, message: "OK", data: response });
        } catch (error) {
            return next(error);
        }
    }

    static async getAllTransaction ( req, res, next ){
        let { filter, sort, page } = req.query;
        const paramQuerySQL = {};
        let limit;
        let offset;
      
        if (
            filter?.status !== "" &&
            typeof filter?.status !== "undefined"
        ) {
            paramQuerySQL.where = {
                ...paramQuerySQL.where,
                status: { [Op.eq]: filter.status },
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
         if (page?.size !== "" && typeof page?.size !== "undefined") {
            limit = page?.size;
            paramQuerySQL.limit = limit;
        } else{
            limit = 10;
            paramQuerySQL.limit = limit;
         }
        
        if (page?.number !== "" && typeof page?.number !== "undefined") {
            offset = page?.number * limit - limit;
            paramQuerySQL.offset = offset;
        } else {
            offset = 0;
            paramQuerySQL.offset = offset;
        }

        try {
            let data = await Transaction.findAndCountAll( {
                 ...paramQuerySQL,
                include: [
                    {
                        model: Cart,
                        as: "origin",
                    },
                    {
                        model: Store,
                        as: "store",
                        attributes: ["id", "name"],
                    },
                ],
            });
            if (data) {
                return res
                    .status(200)
                    .json({ status: 200, message: "OK", data });
            } else {
                return res.status(500).json({
                    status: 500,
                    message: "Failed to get transaction data",
                });
            }
        } catch (error) {
            return next(error);
        }
    }

    static async getUserTransactionHistory(req, res, next) {
        const { user_id } = req.params;
        try {
            let data = await Transaction.findAll({
                where: { user_id: user_id },
            });
            if (data) {
                return res
                    .status(200)
                    .json({ status: 200, message: "OK", data });
            } else {
                return res.status(500).json({
                    status: 500,
                    message: "Failed to get transaction data",
                });
            }
        } catch (error) {
            return next(error);
        }
    }

    static async getTransactionDetail(req, res, next) {
        const { id } = req.params;
        if (!validate(id)) {
            return res
                .status(400)
                .json({ status: 400, message: "Invalid UUID Format" });
        }

        let data = await Transaction.findOne({ where: { id: id } });
        try {
            if (data) {
                return res
                    .status(200)
                    .json({ status: 200, message: "OK", data });
            } else {
                return res.status(500).json({
                    status: 500,
                    message: "Failed get transaction data",
                });
            }
        } catch (error) {
            return next(error);
        }
    }

    static async updateTransaction(req, res, next) {
        const { id } = req.params;

        if (!validate(id)) {
            return res
                .status(400)
                .json({ status: 400, message: "Invalid UUID Format" });
        }

        const {
            user_id,
            cart_id,
            amount,
            paid_amount,
            paid_at,
            proof_of_payment,
            payment_type,
            status,
            cardholder_name,
            store_in_charge,
        } = req.body;

        try {
            const storeData = await Transaction.findOne({
                where: {
                    id: id,
                },
                returning: true,
                plain: true,
            });

            if (storeData) {
                const updateResponse = await Transaction.update(
                    {
                        user_id,
                        cart_id,
                        amount,
                        paid_amount,
                        paid_at,
                        proof_of_payment,
                        payment_type,
                        status,
                        cardholder_name,
                        store_in_charge,
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
                    .json({ status: 404, message: "transaction not found!" });
            }
        } catch (error) {
            return next(error);
        }
    }

    static async uploadProofOfPayment(req, res, next) {
        const { id } = req.params;
        if (!validate(id)) {
            return res
                .status(400)
                .json({ status: 400, message: "Invalid UUID Format" });
        }

        const multerUpload = uploader("PROOF_OF_PAYMENT_").fields([
            { name: "proof_of_payment" },
        ]);

        try {
            const storeData = await Transaction.findOne({
                where: {
                    id: id,
                },
                returning: true,
                plain: true,
            });

            if (storeData) {
                multerUpload(req, res, (err) => {
                    if (err) {
                        return res.status(500).json({ msg: err });
                    }
                    const { proof_of_payment } = req.files;

                    let path = proof_of_payment[0].path;
                    const fileStream = fs.createReadStream(path);

                    var params = {
                        Bucket: process.env.BUCKET_NAME,
                        Key: `${proof_of_payment[0].originalname}`,
                        Body: fileStream,
                        ACL: "public-read",
                        ContentType: proof_of_payment[0].mimetype,
                        ContentDisposition: "inline",
                    };

                    s3.upload(params, (err, data) => {
                        if (err) {
                            return res.status(500).json({
                                status: 500,
                                message: err,
                            });
                        }
                        if (data) {
                            fs.unlinkSync(path);
                            const objectS3Url = data.Location;
                            Transaction.update(
                                {
                                    proof_of_payment: objectS3Url,
                                },
                                {
                                    where: {
                                        id: id,
                                    },
                                    returning: true,
                                }
                            )
                                .then((data) => {
                                    return res.status(200).json({ data });
                                })
                                .catch((error) => {
                                    return res
                                        .status(500)
                                        .json({ message: error });
                                });
                        }
                    });
                });
            } else if (!storeData) {
                return res
                    .status(404)
                    .json({ status: 404, message: "Transaction not found" });
            }
        } catch (error) {
            return next(error);
        }
    }

    static async deleteTransaction(req, res, next) {
        const { id } = req.params;
        if (!validate(id)) {
            return res
                .status(400)
                .json({ status: 400, message: "Invalid UUID Format" });
        }

        try {
            const deleteResponse = await Transaction.destroy({
                where: { id: id },
                returning: true,
            });
            if (deleteResponse) {
                return res.status(200).json({
                    status: 200,
                    message: `Success delete transaction with id ${id}`,
                });
            } else {
                return res.status(404).json({
                    status: 404,
                    message: `Failed, transaction with id ${id} not found`,
                });
            }
        } catch (error) {
            return next(error);
        }
    }
}

module.exports = TransactionController;
