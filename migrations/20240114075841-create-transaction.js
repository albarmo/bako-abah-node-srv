"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Transactions", {
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
            amount: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            paid_amount: {
                type: Sequelize.INTEGER,
            },
            paid_at: {
                type: Sequelize.DATE,
            },
            proof_of_payment: {
                type: Sequelize.STRING,
            },
            payment_type: {
                type: Sequelize.STRING,
            },
            status: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            cardholder_name: {
                type: Sequelize.STRING,
            },
            store_in_charge: {
                type: Sequelize.UUID,
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
        await queryInterface.dropTable("Transactions");
    },
};
