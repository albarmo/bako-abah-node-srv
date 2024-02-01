const fs = require("fs");
const { parse } = require("csv-parse");
const { v4: uuidv4 } = require("uuid");

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
const result = [];
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
            image: "/PRODUCT_IMAGE1706065003595.jpg",
        };
        for (let index = 0; index < rowData.length; index++) {
            dataItem[headers[index]] = rowData[index];
        }
        result.push(dataItem);
    })
    .on("end", function () {
        console.log("finished");
        console.log(result);
    })
    .on("error", function (error) {
        console.log(error.message);
    });
