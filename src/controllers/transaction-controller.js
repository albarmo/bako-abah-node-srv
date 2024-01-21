const { Transaction, Cart, Store } = require("../../models");
const { validate } = require("uuid");
const uploader = require("../helpers/uploader");

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

    static async getAllTransaction(req, res, next) {
        try {
            let data = await Transaction.findAll({
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
        const upload = uploader("PROOF_OF_PAYMENT").fields([
            { name: "proof_of_payment" },
        ]);
        if (!validate(id)) {
            return res
                .status(400)
                .json({ status: 400, message: "Invalid UUID Format" });
        }
        try {
            const storeData = await Transaction.findOne({
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
                    const { proof_of_payment } = req.files;
                    const imagePath = proof_of_payment
                        ? "/" + proof_of_payment[0].filename
                        : null;

                    Transaction.update(
                        {
                            proof_of_payment: imagePath,
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
                            return res.status(500).json({ message: error });
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
