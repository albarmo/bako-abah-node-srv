"use strict";
const { Model } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize, DataTypes) => {
    class Category extends Model {
        static associate(models) {
            Category.hasMany(models.Product, {
                as: "products",
                sourceKey: "id",
                foreignKey: "category_id",
            });
        }
    }
    Category.init(
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        args: true,
                        msg: "Category name cant be empty",
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
            modelName: "Category",
        }
    );
    return Category;
};
