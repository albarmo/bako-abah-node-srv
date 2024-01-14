"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Product extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Product.init(
        {
            category_id: DataTypes.UUID,
            name: DataTypes.STRING,
            description: DataTypes.STRING,
            weight: DataTypes.INTEGER,
            image: DataTypes.STRING,
            local_price: DataTypes.INTEGER,
            international_prize: DataTypes.INTEGER,
            stock: DataTypes.INTEGER,
            is_active: DataTypes.BOOLEAN,
        },
        {
            sequelize,
            modelName: "Product",
        }
    );
    return Product;
};
