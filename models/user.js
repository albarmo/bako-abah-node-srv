"use strict";
const { Model } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
const { hashPassword } = require("../src/helpers/bcrypt");

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            User.hasMany(models.Cart, {
                sourceKey: "id",
                foreignKey: "user_id",
            });
            User.hasMany(models.ShippingAddres, {
                sourceKey: "id",
                foreignKey: "user_id",
            });
            User.hasMany(models.Transaction, {
                sourceKey: "id",
                foreignKey: "user_id",
            });
        }
    }
    User.init(
        {
            first_name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        args: true,
                        msg: "User firstname cant be empty",
                    },
                },
            },
            last_name: DataTypes.STRING,
            email: DataTypes.STRING,
            phone_number: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        args: true,
                        msg: "User phone number cannot be empty",
                    },
                    len: {
                        args: [7, 15],
                        msg: "Invalid Phone Number",
                    },
                },
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        args: true,
                        msg: "Password cannot be empty",
                    },
                    len: {
                        args: [5, 30],
                        msg: "Minimum length of password is 5",
                    },
                },
            },
            role: DataTypes.STRING,
        },
        {
            hooks: {
                beforeCreate(instance) {
                    instance.id = uuidv4();
                    instance.password = hashPassword(instance.password);
                    instance.role = "customer";
                },
                beforeUpdate(instance) {
                    instance.password = hashPassword(instance.password);
                },
            },
            sequelize,
            modelName: "User",
        }
    );
    return User;
};
