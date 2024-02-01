"use strict";

const fs = require("fs");
const { parse } = require("csv-parse");
const { v4: uuidv4 } = require("uuid");

async function readFile(filename) {
    const headers = [
        "name",
        "description",
        "weight",
        "image",
        "local_price",
        "international_prize",
        "stock",
        "is_active",
    ];
    let records = [];
    return new Promise((resolve) => {
        fs.createReadStream("./seeders/product.csv")
            .pipe(
                parse({
                    delimiter: ",",
                    from_line: 2,
                })
            )
            .on("data", function (row) {
                const rowData = row[0].split(";");
                let dataItem = {
                    id: uuidv4(),
                    category_id: null,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    stock: 10,
                    is_active: true,
                };
                for (let index = 0; index < rowData.length; index++) {
                    if (
                        [
                            "stock",
                            "weight",
                            "local_price",
                            "international_prize",
                        ].includes(headers[index])
                    ) {
                        dataItem[headers[index]] = +rowData[index] || 0;
                    } else {
                        dataItem[headers[index]] = rowData[index];
                    }
                }

                dataItem.is_active = true;
                records.push(dataItem);
            })
            .on("end", () => {
                resolve(records);
            })
            .on("error", function (error) {
                console.log(error.message);
            });
    });
}

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const recordsFromCsv = await readFile("./seeders/product.csv");
        console.log(recordsFromCsv);
        await queryInterface.bulkInsert("Products", recordsFromCsv, {});
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete("Products", null, {});
    },
};
