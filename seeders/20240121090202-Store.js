"use strict";

const { hashPassword } = require("../helpers/bcrypt");

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert(
            "Stores",
            [
                {
                    id: "f4b010bf-ad46-40d8-9ce5-7494aa02eb92",
                    name: "STORE 1",
                    map_url:
                        "https://www.google.com/maps/place/Bako+Abah+168/@-6.2956524,106.7904517,15z/data=!4m6!3m5!1s0x2e69ef81cb2a6de1:0xae2fb6d16bca3d35!8m2!3d-6.3020554!4d106.7945334!16s%2Fg%2F11rylkpr8h?entry=tts",
                    is_active: true,
                    admin_phone_number: "081280709984",
                    address:
                        "Jl. RS. Fatmawati Raya, RT.8/RW.4, Cilandak Bar., Kec. Cilandak, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12430",
                    operational_hour: "10:00AM - 20:30PM",
                    createdAt: "2024-01-21T08:29:38.939Z",
                    updatedAt: "2024-01-21T08:29:38.939Z",
                },
                {
                    id: "f63817ac-0c24-491a-85d5-f34f1827e37a",
                    name: "STORE 2",
                    map_url:
                        "https://www.google.com/maps/place/Bako+Abah+168/@-6.2956524,106.7904517,15z/data=!4m6!3m5!1s0x2e69ef81cb2a6de1:0xae2fb6d16bca3d35!8m2!3d-6.3020554!4d106.7945334!16s%2Fg%2F11rylkpr8h?entry=tts",
                    is_active: true,
                    admin_phone_number: "081280709984",
                    address:
                        "Jl. RS. Fatmawati Raya, RT.8/RW.4, Cilandak Bar., Kec. Cilandak, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12430",
                    operational_hour: "10:00AM - 20:30PM",
                    createdAt: "2024-01-21T08:29:44.443Z",
                    updatedAt: "2024-01-21T08:29:44.443Z",
                },
                {
                    id: "06a2838a-c715-47c9-ab2c-24064739fa81",
                    name: "STORE 3",
                    map_url:
                        "https://www.google.com/maps/place/Bako+Abah+168/@-6.2956524,106.7904517,15z/data=!4m6!3m5!1s0x2e69ef81cb2a6de1:0xae2fb6d16bca3d35!8m2!3d-6.3020554!4d106.7945334!16s%2Fg%2F11rylkpr8h?entry=tts",
                    is_active: true,
                    admin_phone_number: "081280709984",
                    address:
                        "Jl. RS. Fatmawati Raya, RT.8/RW.4, Cilandak Bar., Kec. Cilandak, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12430",
                    operational_hour: "10:00AM - 20:30PM",
                    createdAt: "2024-01-21T08:29:49.543Z",
                    updatedAt: "2024-01-21T08:29:49.543Z",
                },
            ],
            {}
        );
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete("Stores", null, {});
    },
};
