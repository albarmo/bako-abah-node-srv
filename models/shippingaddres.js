"use strict";
const { Model } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize, DataTypes) => {
    class ShippingAddres extends Model {
        static associate(models) {
            ShippingAddres.belongsTo(models.User, {
                as: "address_owner",
                targetKey: "id",
                foreignKey: "user_id",
            });
            ShippingAddres.belongsToMany(models.Cart, {
                targetKey: "id",
                foreignKey: "id",
                through: "shipping_id",
            });
        }
    }
    ShippingAddres.init(
        {
            user_id: {
                type: DataTypes.UUID,
                allowNull: false,
                validate: {
                    notEmpty: {
                        args: true,
                        msg: "Field user_id cant be found",
                    },
                },
            },
            receiver_name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        args: true,
                        msg: "Please insert receiver name",
                    },
                },
            },
            receiver_phone_number: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        args: true,
                        msg: "Please insert receiver contact phone number",
                    },
                },
            },
            label: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        args: true,
                        msg: "Please insert Address label",
                    },
                },
            },
            address: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        args: true,
                        msg: "Please insert Address detail",
                    },
                },
            },
            province: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        args: true,
                        msg: "Province cant be empty",
                    },
                },
            },
            city: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        args: true,
                        msg: "City cant be empty",
                    },
                },
            },
            district: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        args: true,
                        msg: "District cant be empty",
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
            modelName: "ShippingAddres",
        }
    );
    return ShippingAddres;
};
