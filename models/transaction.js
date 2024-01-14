"use strict";
const { Model } = require("sequelize");
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
            user_id: DataTypes.UUID,
            cart_id: DataTypes.UUID,
            amount: DataTypes.INTEGER,
            paid_amount: DataTypes.INTEGER,
            paid_at: DataTypes.DATE,
            proof_of_payment: DataTypes.STRING,
            payment_type: DataTypes.STRING,
            status: DataTypes.STRING,
            cardholder_name: DataTypes.STRING,
            store_in_charge: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "Transaction",
        }
    );
    return Transaction;
};
