// database/connection.ts
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('api_nodejs', 'root', '0408', {
  host: 'localhost',
  dialect: 'mysql',
  timezone: '-06:00' // Configura la zona horaria a UTC-6 para CST
});

export default sequelize;
