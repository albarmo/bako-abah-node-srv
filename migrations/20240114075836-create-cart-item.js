"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("CartItems", {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
            },
            cart_id: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: "Carts",
                    key: "id",
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            },
            product_id: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: "Products",
                    key: "id",
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            },
            quantity: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            subtotal: {
                type: Sequelize.INTEGER,
                allowNull: false,
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
        await queryInterface.dropTable("CartItems");
    },
};
