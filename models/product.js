"use strict";
const { Model } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize, DataTypes) => {
    class Product extends Model {
        static associate(models) {
            Product.belongsTo(models.Category, {
                targetKey: "id",
                foreignKey: "category_id",
            });
            Product.belongsTo(models.CartItem, {
                targetKey: "id",
                foreignKey: "product_id",
            });
        }
    }
    Product.init(
        {
            category_id: DataTypes.UUID,
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        args: true,
                        msg: "Product name cant be empty",
                    },
                },
            },
            description: DataTypes.STRING,
            weight: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notEmpty: {
                        args: true,
                        msg: "Product weight cant be empty",
                    },
                },
            },
            image: DataTypes.STRING,
            local_price: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notEmpty: {
                        args: true,
                        msg: "Local Price cant be empty",
                    },
                },
            },
            international_prize: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notEmpty: {
                        args: true,
                        msg: "International Price cant be empty",
                    },
                },
            },
            stock: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notEmpty: {
                        args: true,
                        msg: "Product stock cant be empty",
                    },
                },
            },
            is_active: DataTypes.BOOLEAN,
        },
        {
            hooks: {
                beforeCreate(instance) {
                    instance.id = uuidv4();
                },
            },
            sequelize,
            modelName: "Product",
        }
    );
    return Product;
};
