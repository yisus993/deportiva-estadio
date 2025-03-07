import { DataTypes } from "sequelize";
import sequelize from "../database/connection";

const Client = sequelize.define(
    'Client',
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.STRING, allowNull: false },
        phone: { type: DataTypes.STRING, allowNull: false },
        email: { type: DataTypes.STRING, allowNull: false },
        rfc: { type: DataTypes.STRING, allowNull: false },
        uso_cfdi: { type: DataTypes.STRING, allowNull: false, defaultValue: 'G03' },
        regimen_fiscal: { type: DataTypes.STRING, allowNull: false },
        codigo_postal: { type: DataTypes.STRING, allowNull: false }
    }
);

export default Client;
