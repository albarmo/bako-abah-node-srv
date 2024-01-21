"use strict";
const { Model } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize, DataTypes) => {
    class Transaction extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Transaction.init(
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
            cart_id: {
                type: DataTypes.UUID,
                allowNull: false,
                validate: {
                    notEmpty: {
                        args: true,
                        msg: "Field cart_id name cant be empty",
                    },
                },
            },
            amount: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notEmpty: {
                        args: true,
                        msg: "Field amount cant be empty",
                    },
                },
            },
            paid_amount: DataTypes.INTEGER,
            paid_at: DataTypes.DATE,
            proof_of_payment: DataTypes.STRING,
            payment_type: DataTypes.STRING,
            status: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        args: true,
                        msg: "Field status cant be empty",
                    },
                },
            },
            cardholder_name: DataTypes.STRING,
            store_in_charge: {
                type: DataTypes.UUID,
                allowNull: false,
                validate: {
                    notEmpty: {
                        args: true,
                        msg: "Field store_in_charge cant be empty",
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
            modelName: "Transaction",
        }
    );
    return Transaction;
};
