"use strict";
const { Model } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize, DataTypes) => {
    class Brand extends Model {
        static associate(models) {
            // define association here
        }
    }
    Brand.init(
        {
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
            image: DataTypes.STRING,
            is_active: DataTypes.BOOLEAN,
        },
        {
            hooks: {
                beforeCreate(instance) {
                    instance.id = uuidv4();
                },
            },
            sequelize,
            modelName: "Brand",
        }
    );
    return Brand;
};
