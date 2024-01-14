"use strict";
const { Model } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize, DataTypes) => {
    class Cart extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Cart.init(
        {
            user_id: DataTypes.UUID,
            shipping_id: DataTypes.UUID,
            subtotal: DataTypes.INTEGER,
            discount: DataTypes.INTEGER,
            total_weight: DataTypes.INTEGER,
            grand_total: DataTypes.INTEGER,
            status: DataTypes.STRING,
            shipping_price: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "Cart",
        }
    );
    return Cart;
};
