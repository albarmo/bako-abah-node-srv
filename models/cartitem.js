"use strict";
const { Model } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize, DataTypes) => {
    class CartItem extends Model {
        static associate(models) {
            CartItem.belongsTo(models.Cart, {
                targetKey: "id",
                foreignKey: "cart_id",
                as: "items",
            });
            CartItem.belongsTo(models.Product, {
                as: "product",
                targetKey: "id",
                foreignKey: "product_id",
            });
        }
    }
    CartItem.init(
        {
            cart_id: {
                type: DataTypes.UUID,
                allowNull: false,
                validate: {
                    notEmpty: {
                        args: true,
                        msg: "Field card_id name cant be empty",
                    },
                },
            },
            product_id: {
                type: DataTypes.UUID,
                allowNull: false,
                validate: {
                    notEmpty: {
                        args: true,
                        msg: "Field product_id name cant be empty",
                    },
                },
            },
            quantity: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notEmpty: {
                        args: true,
                        msg: "Please insert quantity",
                    },
                },
            },
            subtotal: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notEmpty: {
                        args: true,
                        msg: "Subtotal is empty",
                    },
                },
            },
        },
        {
            hooks: {
                beforeCreate(instance) {
                    instance.id = uuidv4();
                },
            },
            sequelize,
            modelName: "CartItem",
        }
    );
    return CartItem;
};
