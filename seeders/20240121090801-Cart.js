"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert(
            "Carts",
            [
                {
                    id: "fd36f3f0-f2cd-4161-b3df-82b2c1814e1f",
                    user_id: "bbf393ab-d6ee-4a54-8f85-34f3919c4fc6",
                    shipping_id: "a2516192-10ae-499e-a25e-82e267780ffe",
                    subtotal: 10000,
                    discount: 5000,
                    total_weight: 30,
                    grand_total: 8000,
                    status: "CREATED",
                    shipping_price: 3000,
                    createdAt: "2024-01-21T08:35:31.052Z",
                    updatedAt: "2024-01-21T08:35:31.052Z",
                },
                {
                    id: "ece8ab19-b353-4952-8a8c-8315bb6de961",
                    user_id: "569a98eb-4740-4d80-9094-79c04c64e2a9",
                    shipping_id: "edd44169-5ed5-415d-bc5f-c8950e8866b5",
                    subtotal: 10000,
                    discount: 5000,
                    total_weight: 30,
                    grand_total: 8000,
                    status: "CREATED",
                    shipping_price: 3000,
                    createdAt: "2024-01-21T08:36:50.034Z",
                    updatedAt: "2024-01-21T08:36:50.034Z",
                },
            ],
            {}
        );
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete("Carts", null, {});
    },
};
