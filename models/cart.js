"use strict";
const { Model } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize, DataTypes) => {
    class Cart extends Model {
        static associate(models) {
            Cart.belongsTo(models.User, {
                targetKey: "id",
                foreignKey: "user_id",
                as: "user",
            });
            Cart.belongsTo(models.Store, {
                targetKey: "id",
                foreignKey: "user_id",
                as: "store",
            });
            Cart.hasMany(models.CartItem, {
                as: "items",
                sourceKey: "id",
                foreignKey: "cart_id",
            });
            Cart.belongsTo(models.ShippingAddres, {
                sourceKey: "id",
                foreignKey: "shipping_id",
                as: "address",
            });
            Cart.hasMany(models.Transaction, {
                as: "origin",
                sourceKey: "id",
                foreignKey: "cart_id",
            });
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
