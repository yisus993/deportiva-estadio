import { DataTypes } from "sequelize";
import sequelize from "../database/connection";

export const Product = sequelize.define(
    'Product',
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.STRING, allowNull: false },
        quantity: { type: DataTypes.INTEGER, allowNull: false },
        price: { type: DataTypes.FLOAT, allowNull: false },
        status: { type: DataTypes.INTEGER, allowNull: false }
    }
);
