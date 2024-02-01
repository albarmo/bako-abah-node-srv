"use strict";
const { Model } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize, DataTypes) => {
    class Store extends Model {
        static associate(models) {
            Store.hasMany(models.Transaction, {
                targetKey: "id",
                foreignKey: "id",
            });
            Store.hasMany(models.Cart, {
                sourceKey: "id",
                foreignKey: "id",
            });
        }
    }
    Store.init(
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        args: true,
                        msg: "Store name cant be empty",
                    },
                },
            },
            map_url: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        args: true,
                        msg: "Please insert google map url",
                    },
                },
            },
            is_active: DataTypes.BOOLEAN,
            admin_phone_number: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        args: true,
                        msg: "Admin store phone number cant be empty",
                    },
                },
            },
            address: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        args: true,
                        msg: "Store address cant be empty",
                    },
                },
            },
            operational_hour: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        args: true,
                        msg:
                            "Please insert store operational hour (ex: 10:00AM - 20:30PM)",
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
            modelName: "Store",
        }
    );
    return Store;
};
