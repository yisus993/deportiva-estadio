import { DataTypes, Model } from 'sequelize';
import sequelize from '../database/connection';

export interface LogAttributes {
  id?: number;
  user: string;
  action: string;
  timestamp?: Date;
  details: string;
}

export class Log extends Model<LogAttributes> implements LogAttributes {
  public id!: number;
  public user!: string;
  public action!: string;
  public timestamp!: Date;
  public details!: string;
}

Log.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    action: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    details: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Log',
  }
);
