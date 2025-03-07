import express, { Application } from 'express';
import cors from 'cors';
import path from 'path';
import RUser from '../routes/user';
import RProduct from '../routes/product';
import RClient from '../routes/client';
import RVenta from '../routes/venta';
import authRoutes from '../routes/auth';
import invoiceRoutes from '../routes/invoice';
import logRoutes from '../routes/logRoutes';
import anuncioRoutes from '../routes/anuncio';
import noteRoutes from '../routes/note';
import { User } from './user';
import { Product } from './product';
import { Venta } from './venta';
import Client from './client';
import Invoice from './invoice';
import sequelize from '../database/connection';
import { obtenerVentasUltimos30Dias, obtenerVentasDiarias, obtenerVentasPorTrabajador, obtenerProductosMasVendidos, obtenerMetodosPago } from '../controllers/venta';
import { obtenerClientesRegistradosDia } from '../controllers/client';
import { Log } from './log';
import Note from './note';

class Server {
  private app: Application;
  private port: string;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || '3025';
    this.listen();
    this.midlewares();
    this.router();
    this.DBconnect();
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("This execute from port: " + this.port);
    });
  }

  router() {
    this.app.use(RUser);
    this.app.use(RProduct);
    this.app.use(RClient);
    this.app.use('/api/ventas', RVenta);
    this.app.use('/api/auth', authRoutes);
    this.app.use('/api/invoices', invoiceRoutes);
    this.app.use('/api/logs', logRoutes);
    this.app.use('/api/anuncios', anuncioRoutes);
    this.app.use('/api/notas', noteRoutes);

    this.app.get('/api/ventas/ultimos-30-dias', obtenerVentasUltimos30Dias);
    this.app.get('/api/ventas/obtenerVentasDiarias', obtenerVentasDiarias);
    this.app.get('/api/ventas/obtenerVentasPorTrabajador', obtenerVentasPorTrabajador);
    this.app.get('/api/ventas/obtenerProductosMasVendidos', obtenerProductosMasVendidos);
    this.app.get('/api/ventas/obtenerMetodosPago', obtenerMetodosPago);
    this.app.get('/api/clientes/obtenerClientesRegistradosDia', obtenerClientesRegistradosDia);
  }

  midlewares() {
    this.app.use(express.json());

    const corsOptions = {
      origin: 'http://localhost:4200',
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    };

    this.app.use(cors(corsOptions));
    this.app.use('/public', express.static(path.join(__dirname, '../public')));
  }

  async DBconnect() {
    try {
      await User.sync();
      await sequelize.authenticate();
      await Product.sync();
      await Client.sync();
      await Venta.sync({ alter: true });
      await Invoice.sync({ alter: true });
      await Log.sync();
      await Note.sync();
    } catch (error) {
      console.log("Error de Conexion ", error);
    }
  }
}

export default Server;
