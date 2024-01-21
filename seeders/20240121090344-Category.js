"use strict";

const { hashPassword } = require("../helpers/bcrypt");

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert(
            "Categories",
            [
                {
                    id: "210f4a40-c79d-42d0-b7c9-f0d1de27f598",
                    name: "Tembakau",
                    is_active: true,
                    createdAt: "2024-01-21T08:30:14.089Z",
                    updatedAt: "2024-01-21T08:30:14.089Z",
                },
                {
                    id: "222e0b11-ca94-4459-9fd0-a9e308b3e175",
                    name: "Cerutu",
                    is_active: true,
                    createdAt: "2024-01-21T08:30:26.528Z",
                    updatedAt: "2024-01-21T08:30:26.528Z",
                },
                {
                    id: "86ebf7c6-a8a4-4a10-9ecc-d7f53caa4bf6",
                    name: "Aksesoris",
                    is_active: true,
                    createdAt: "2024-01-21T08:30:34.540Z",
                    updatedAt: "2024-01-21T08:30:34.540Z",
                },
                {
                    id: "a5b5bde0-0782-407a-b625-49f999ce194b",
                    name: "Kiloan",
                    is_active: true,
                    createdAt: "2024-01-21T08:30:40.234Z",
                    updatedAt: "2024-01-21T08:30:40.234Z",
                },
            ],
            {}
        );
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete("Categories", null, {});
    },
};
