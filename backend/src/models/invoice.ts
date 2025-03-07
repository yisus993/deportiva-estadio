import { DataTypes } from "sequelize";
import sequelize from "../database/connection";
import Client from "./client";

const Invoice = sequelize.define(
    'Invoice',
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        clientId: {
            type: DataTypes.INTEGER,
            references: {
                model: Client,
                key: 'id'
            },
            allowNull: false
        },
        amount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
        description: { type: DataTypes.STRING, allowNull: false },
        items: { type: DataTypes.JSON, allowNull: false }, // Para guardar los productos y cantidades
        createdAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW }
    },
    { timestamps: true }
);

Client.hasMany(Invoice, { foreignKey: 'clientId' });
Invoice.belongsTo(Client, { foreignKey: 'clientId' });

export default Invoice;
