"use strict";

const { hashPassword } = require("../helpers/bcrypt");

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert(
            "ShippingAddres",
            [
                {
                    id: "a2516192-10ae-499e-a25e-82e267780ffe",
                    user_id: "bbf393ab-d6ee-4a54-8f85-34f3919c4fc6",
                    receiver_name: "Albar",
                    receiver_phone_number: "081280709980",
                    label: "Home",
                    address: "Jalan H Mandor",
                    province: "DKI JAKARTA",
                    city: "JAKARTA SELATAN",
                    district: "CILANDAK BARAT",
                    createdAt: "2024-01-21T08:33:31.243Z",
                    updatedAt: "2024-01-21T08:33:31.243Z",
                },
                {
                    id: "edd44169-5ed5-415d-bc5f-c8950e8866b5",
                    user_id: "569a98eb-4740-4d80-9094-79c04c64e2a9",
                    receiver_name: "Rizky",
                    receiver_phone_number: "081280709980",
                    label: "Home",
                    address: "Jalan H Mandor",
                    province: "DKI JAKARTA",
                    city: "JAKARTA SELATAN",
                    district: "CILANDAK BARAT",
                    createdAt: "2024-01-21T08:33:49.659Z",
                    updatedAt: "2024-01-21T08:33:49.659Z",
                },
                {
                    id: "566f3158-76fe-42f7-af9e-3ebfc5e62aa1",
                    user_id: "bbf393ab-d6ee-4a54-8f85-34f3919c4fc6",
                    receiver_name: "BRI",
                    receiver_phone_number: "081280709980",
                    label: "Office",
                    address: "Jalan H Mandor",
                    province: "DKI JAKARTA",
                    city: "JAKARTA SELATAN",
                    district: "CILANDAK BARAT",
                    createdAt: "2024-01-21T08:34:41.805Z",
                    updatedAt: "2024-01-21T08:34:41.805Z",
                },
            ],
            {}
        );
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete("ShippingAddres", null, {});
    },
};
