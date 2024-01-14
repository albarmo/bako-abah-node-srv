"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Carts", {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
            },
            user_id: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: "Users",
                    key: "id",
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            },
            shipping_id: {
                type: Sequelize.UUID,
                references: {
                    model: "ShippingAddres",
                    key: "id",
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            },
            subtotal: {
                type: Sequelize.INTEGER,
            },
            discount: {
                type: Sequelize.INTEGER,
            },
            total_weight: {
                type: Sequelize.INTEGER,
            },
            grand_total: {
                type: Sequelize.INTEGER,
            },
            status: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            shipping_price: {
                type: Sequelize.INTEGER,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("Carts");
    },
};
