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
            user_id: {
                type: DataTypes.UUID,
                allowNull: false,
                validate: {
                    notEmpty: {
                        args: true,
                        msg: "Field user_id name cant be empty",
                    },
                },
            },
            shipping_id: DataTypes.UUID,
            subtotal: DataTypes.INTEGER,
            discount: DataTypes.INTEGER,
            total_weight: DataTypes.INTEGER,
            grand_total: DataTypes.INTEGER,
            status: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        args: true,
                        msg: "Field status name cant be empty",
                    },
                },
            },
            shipping_price: DataTypes.INTEGER,
        },
        {
            hooks: {
                beforeCreate(instance) {
                    instance.id = uuidv4();
                },
            },
            sequelize,
            modelName: "Cart",
        }
    );
    return Cart;
};
