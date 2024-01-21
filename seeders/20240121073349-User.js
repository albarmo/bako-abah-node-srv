"use strict";

const { hashPassword } = require("../helpers/bcrypt");
const { v4: uuidv4 } = require("uuid");
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert(
            "Users",
            [
                {
                    id: uuidv4(),
                    fullname: "Superadmin Plagams",
                    email: "administrator@plagams.store",
                    phone: "085692495134",
                    address: "403 George Ave.Shakopee, MN 55379",
                    region: "Indonesia",
                    gender: "male",
                    password: hashPassword("PlagaMS2023!"),
                    type: "admin",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ],
            {}
        );
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete("Users", null, {});
    },
};
