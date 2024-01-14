"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class ShippingAddres extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    ShippingAddres.init(
        {
            user_id: DataTypes.UUID,
            receiver_name: DataTypes.STRING,
            receiver_phone_number: DataTypes.STRING,
            label: DataTypes.STRING,
            address: DataTypes.STRING,
            province: DataTypes.STRING,
            city: DataTypes.STRING,
            district: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "ShippingAddres",
        }
    );
    return ShippingAddres;
};
