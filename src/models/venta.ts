import { DataTypes } from "sequelize";
import sequelize from "../database/connection";

export const Venta = sequelize.define(
    'Venta',
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        customerId: { type: DataTypes.INTEGER, allowNull: false },
        totalAmount: { type: DataTypes.FLOAT, allowNull: false },
        metodoPago: { type: DataTypes.STRING, allowNull: false },
        productos: { type: DataTypes.JSON, allowNull: false }, // Cambiamos JSONB a JSON
        pagaConEfectivo: { type: DataTypes.FLOAT, allowNull: false }, // Nueva propiedad
        pagaConTarjeta: { type: DataTypes.FLOAT, allowNull: false }, // Nueva propiedad
        pagaConTransferencia: { type: DataTypes.FLOAT, allowNull: false }, // Nueva propiedad
        cambio: { type: DataTypes.FLOAT, allowNull: false } // Nueva propiedad
    }
);
