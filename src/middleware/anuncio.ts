// middleware/anuncio.ts (o donde sea necesario)
// Otros imports necesarios
import sequelize from '../database/connection';

class AnuncioMiddleware {
  async DBconnect() {
    try {
      await sequelize.authenticate();
      await sequelize.sync();
      console.log('Conexión exitosa a la base de datos.');
    } catch (error) {
      console.log('Error de Conexion ', error);
    }
  }
}

export default AnuncioMiddleware;
