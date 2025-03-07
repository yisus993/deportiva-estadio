import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../database/connection";

interface UserAttributes {
    id: number;
    name: string;
    lastname: string;
    user: string;
    email: string;
    password: string;
    role: 'Admin' | 'Vendedor';
    status: number;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: number;
    public name!: string;
    public lastname!: string;
    public user!: string;
    public email!: string;
    public password!: string;
    public role!: 'Admin' | 'Vendedor';
    public status!: number;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

User.init(
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.STRING, allowNull: false },
        lastname: { type: DataTypes.STRING, allowNull: false },
        user: { type: DataTypes.STRING, unique: true, allowNull: false },
        email: { type: DataTypes.STRING, unique: true, allowNull: false, validate: { isEmail: true } },
        password: { type: DataTypes.STRING, allowNull: false },
        role: { type: DataTypes.ENUM('Admin', 'Vendedor'), allowNull: false, defaultValue: 'Vendedor' },
        status: { type: DataTypes.INTEGER, allowNull: false }
    },
    {
        sequelize,
        modelName: 'User',
        tableName: 'users',
    }
);
