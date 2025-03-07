import { DataTypes } from 'sequelize';
import sequelize from '../database/connection';

const Anuncio = sequelize.define('Anuncio', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  contenido: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  fecha: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  }
}, {
  tableName: 'anuncios',
});

export default Anuncio;
