"use strict";

const { hashPassword } = require("../helpers/bcrypt");

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert(
            "Transactions",
            [
                {
                    id: "ebab96d5-e3d6-4185-ba3c-174b4c7afe44",
                    user_id: "569a98eb-4740-4d80-9094-79c04c64e2a9",
                    cart_id: "ece8ab19-b353-4952-8a8c-8315bb6de961",
                    amount: 10000,
                    paid_amount: null,
                    paid_at: null,
                    proof_of_payment: "/PROOF_OF_PAYMENT1705827364133.pdf",
                    payment_type: "BANK_TRANSFER",
                    status: "UNPAID",
                    cardholder_name: "Albar Moerhamsa",
                    store_in_charge: "f4b010bf-ad46-40d8-9ce5-7494aa02eb92",
                    createdAt: "2024-01-21T08:42:44.588Z",
                    updatedAt: "2024-01-21T08:56:04.145Z",
                },
            ],
            {}
        );
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete("Transactions", null, {});
    },
};
