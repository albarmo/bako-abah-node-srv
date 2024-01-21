"use strict";

const { hashPassword } = require("../src/helpers/bcrypt");

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert(
            "Users",
            [
                {
                    id: "bbf393ab-d6ee-4a54-8f85-34f3919c4fc6",
                    first_name: "Albar",
                    last_name: "Moerhamsa",
                    email: "moerhamsa@gmail.com",
                    phone_number: "081280709980",
                    password: hashPassword("BAKOABAH2024!"),
                    role: "customer",
                    createdAt: "2024-01-21T08:26:08.385Z",
                    updatedAt: "2024-01-21T08:26:08.385Z",
                },
                {
                    id: "569a98eb-4740-4d80-9094-79c04c64e2a9",
                    first_name: "Rizky",
                    last_name: "Syahputra",
                    email: "eky1579@gmail.com",
                    phone_number: "085718484065",
                    password: hashPassword("BAKOABAH2024!"),
                    role: "customer",
                    createdAt: "2024-01-21T08:26:38.624Z",
                    updatedAt: "2024-01-21T08:26:38.624Z",
                },
                {
                    id: "0db64f8a-e5aa-4e27-b0a5-7df60f74fbf3",
                    first_name: "Administrator",
                    last_name: "1",
                    email: "bakoabah@gmail.com",
                    phone_number: "081245552365",
                    password: hashPassword("BAKOABAH2024!"),
                    role: "admin",
                    createdAt: "2024-01-21T08:27:13.707Z",
                    updatedAt: "2024-01-21T08:27:13.707Z",
                },
            ],
            {}
        );
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete("Users", null, {});
    },
};
