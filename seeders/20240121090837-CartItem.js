"use strict";

const { hashPassword } = require("../helpers/bcrypt");

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert(
            "CartItems",
            [
                {
                    id: "ce725ebc-a084-4c46-ae0e-4f7f61dd9c4a",
                    cart_id: "fd36f3f0-f2cd-4161-b3df-82b2c1814e1f",
                    product_id: "8df8dade-3cea-4424-8cf5-e7e86f361ea0",
                    quantity: 2,
                    subtotal: 5000,
                    createdAt: "2024-01-21T08:37:46.172Z",
                    updatedAt: "2024-01-21T08:37:46.172Z",
                },
                {
                    id: "d9d366b3-40f3-4d67-893c-805695de7d32",
                    cart_id: "fd36f3f0-f2cd-4161-b3df-82b2c1814e1f",
                    product_id: "fe8f2fda-c24d-4cf1-9344-4f0ac77c6783",
                    quantity: 1,
                    subtotal: 5000,
                    createdAt: "2024-01-21T08:37:58.300Z",
                    updatedAt: "2024-01-21T08:37:58.300Z",
                },
                {
                    id: "c999b93f-ed2b-4cce-93ea-e897a9ec18f7",
                    cart_id: "ece8ab19-b353-4952-8a8c-8315bb6de961",
                    product_id: "fe8f2fda-c24d-4cf1-9344-4f0ac77c6783",
                    quantity: 1,
                    subtotal: 5000,
                    createdAt: "2024-01-21T08:38:11.858Z",
                    updatedAt: "2024-01-21T08:38:11.858Z",
                },
                {
                    id: "f8ed275d-f3e3-4164-9b43-b50bdde23a2c",
                    cart_id: "ece8ab19-b353-4952-8a8c-8315bb6de961",
                    product_id: "8df8dade-3cea-4424-8cf5-e7e86f361ea0",
                    quantity: 1,
                    subtotal: 5000,
                    createdAt: "2024-01-21T08:38:23.307Z",
                    updatedAt: "2024-01-21T08:38:23.307Z",
                },
                {
                    id: "662132df-2c2b-4589-b159-37476d055e5d",
                    cart_id: "ece8ab19-b353-4952-8a8c-8315bb6de961",
                    product_id: "5c0c9820-f857-4f67-b9b0-3bfe4441124d",
                    quantity: 1,
                    subtotal: 5000,
                    createdAt: "2024-01-21T08:38:33.928Z",
                    updatedAt: "2024-01-21T08:38:33.928Z",
                },
                {
                    id: "e3f75632-a66a-418d-a55c-4b611e1c6a87",
                    cart_id: "ece8ab19-b353-4952-8a8c-8315bb6de961",
                    product_id: "bf5764b4-403c-4a94-9afa-9bd652af0915",
                    quantity: 1,
                    subtotal: 5000,
                    createdAt: "2024-01-21T08:38:38.367Z",
                    updatedAt: "2024-01-21T08:38:38.367Z",
                },
            ],
            {}
        );
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete("CartItems", null, {});
    },
};
