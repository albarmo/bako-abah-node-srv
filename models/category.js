"use strict";
const { Model } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize, DataTypes) => {
    class Category extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
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
