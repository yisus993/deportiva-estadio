import { Request, Response } from 'express';
import { Venta } from '../models/venta';
import { enviarEmail } from '../email/emailService';
import Client from '../models/client';
import { Op } from 'sequelize';
import sequelize from '../database/connection';
import { Product } from '../models/product'; // Importar el modelo Product
import { LogService } from '../services/logService';

export const registrarVenta = async (req: Request, res: Response): Promise<void> => {
  const { customerId, totalAmount, metodoPago, productos, pagaConEfectivo, pagaConTarjeta, pagaConTransferencia, cambio } = req.body;
  console.log("Datos recibidos:", { customerId, totalAmount, metodoPago, productos, pagaConEfectivo, pagaConTarjeta, pagaConTransferencia, cambio });

  try {
    const cliente = await Client.findByPk(customerId);
    if (!cliente) {
      console.log("Cliente no encontrado");
      res.status(404).json({ message: 'Cliente no encontrado' });
      return;
    }

    // Verificar la cantidad de productos disponibles
    for (const producto of productos) {
      const prod = await Product.findByPk(producto.id); // Asegurarse de usar el campo correcto
      if (!prod || prod.getDataValue('quantity') < producto.quantity) {
        console.log(`No hay suficiente cantidad para el producto: ${producto.id}`);
        res.status(400).json({ message: `No hay suficiente cantidad para el producto: ${producto.name}` });
        return;
      }
    }

    // Realizar la venta y actualizar las cantidades de productos
    await sequelize.transaction(async (t) => {
      for (const producto of productos) {
        const prod = await Product.findByPk(producto.id); // Asegurarse de usar el campo correcto
        if (prod) { // Verificación adicional para evitar errores de tipo null
          await prod.update({ quantity: prod.getDataValue('quantity') - producto.quantity }, { transaction: t });
        } else {
          throw new Error(`Producto con ID: ${producto.id} no encontrado durante la transacción`);
        }
      }

      const nuevaVenta = { customerId, totalAmount, metodoPago, productos, pagaConEfectivo, pagaConTarjeta, pagaConTransferencia, cambio };
      const venta = await Venta.create(nuevaVenta, { transaction: t });

      const usuario = (req as any).user.user;
      const clienteNombre = cliente.getDataValue('name');
      const detalles = `Productos: ${productos.map((p: any) => `${p.name} (Cantidad: ${p.quantity})`).join(', ')},Método de Pago: ${metodoPago}, Total: ${totalAmount} `;
      await LogService.createLog(usuario, `Registrar Venta - ${detalles}`, `Venta echa a: ${clienteNombre} Id Venta: ${venta.getDataValue('id')}`); // Registrar log


      const contenidoTicket = `
        <div style="font-family: Arial, sans-serif;">
          <div style="background-color: #4CAF50; color: white; padding: 10px; text-align: center;">
            <img src="cid:logo" alt="Deportiva Estadio" style="height: 100px;">
            <h1 style="margin: 0;">Ticket De Compra</h1>
          </div>
          <p>ID de Venta: ${venta.getDataValue('id')}</p>
          <p>Cliente: ${venta.getDataValue('customerId')}</p>
          <p>Método de Pago: ${venta.getDataValue('metodoPago')}</p>
          <h2>Productos:</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <th style="border: 1px solid #ddd; padding: 8px;">Nombre</th>
              <th style="border: 1px solid #ddd; padding: 8px;">Cantidad</th>
              <th style="border: 1px solid #ddd; padding: 8px;">Precio</th>
            </tr>
            ${venta.getDataValue('productos').map((producto: any) => `
              <tr>
                <td style="border: 1px solid #ddd; padding: 8px;">${producto.name}</td>
                <td style="border: 1px solid #ddd; padding: 8px;">${producto.quantity}</td>
                <td style="border: 1px solid #ddd; padding: 8px;">${producto.price}</td>
              </tr>
            `).join('')}
          </table>
          <p>Total: $${venta.getDataValue('totalAmount')}</p>
          <p style="color: #4CAF50; font-size: 1.2em;">¡Gracias por su compra!</p>
          <footer style="background-color: #f1f1f1; padding: 10px; text-align: center;">
            <p>Deportiva Estadio - Contacto: deportivaestadio@hotmail.com</p>
          </footer>
        </div>
      `;

      await enviarEmail(cliente.getDataValue('email'), 'Ticket de Venta', contenidoTicket, [
        { filename: 'logo.png', path: 'src/images/logo.png', cid: 'logo' }
      ]);

      console.log("Correo enviado a:", cliente.getDataValue('email'));
      res.json({ message: 'Venta registrada y ticket enviado' });
    });
  } catch (error: unknown) {
    console.error('Error al registrar la venta:', error);
    res.status(500).json({ message: 'Error al registrar la venta', error: error instanceof Error ? error.message : 'Error desconocido' });
  }
};

// Las funciones existentes no se modifican aquí para evitar errores
export const obtenerVentasUltimos30Dias = async (req: Request, res: Response): Promise<void> => {
  try {
    const ventas = await Venta.findAll({
      where: {
        createdAt: {
          [Op.gte]: sequelize.literal('DATE_SUB(CURDATE(), INTERVAL 30 DAY)')
        }
      }
    });
    res.json(ventas);
  } catch (error: unknown) {
    console.error('Error al obtener las ventas:', error);
    res.status(500).json({ message: 'Error al obtener las ventas', error: error instanceof Error ? error.message : 'Error desconocido' });
  }
};

export const obtenerVentasDiarias = async (req: Request, res: Response): Promise<void> => {
  try {
    const ventas = await Venta.findAll({
      attributes: [
        [sequelize.fn('DATE', sequelize.col('createdAt')), 'fecha'],
        [sequelize.fn('SUM', sequelize.col('totalAmount')), 'totalVentas']
      ],
      group: ['fecha']
    });
    const labels = ventas.map((venta: any) => venta.getDataValue('fecha'));
    const totalVentas = ventas.map((venta: any) => venta.getDataValue('totalVentas'));
    res.json({ labels, totalVentas });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las ventas diarias', error });
  }
};

export const obtenerVentasPorTrabajador = async (req: Request, res: Response): Promise<void> => {
  try {
    const ventas = await Venta.findAll({
      attributes: ['customerId', [sequelize.fn('SUM', sequelize.col('totalAmount')), 'totalVentas']],
      group: ['customerId']
    });
    const labels = ventas.map((venta: any) => `Trabajador ${venta.getDataValue('customerId')}`);
    const totalVentas = ventas.map((venta: any) => venta.getDataValue('totalVentas'));
    res.json({ labels, totalVentas });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las ventas por trabajador', error });
  }
};

export const obtenerProductosMasVendidos = async (req: Request, res: Response): Promise<void> => {
  try {
    const productosVendidos = await Venta.findAll({
      attributes: ['productos'],
    });
    const productos: { [key: string]: number } = {};
    productosVendidos.forEach((venta: any) => {
      venta.getDataValue('productos').forEach((producto: any) => {
        if (!productos[producto.name]) productos[producto.name] = 0;
        productos[producto.name] += producto.quantity;
      });
    });
    const labels = Object.keys(productos);
    const cantidadVendida = Object.values(productos);
    res.json({ labels, cantidadVendida });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los productos más vendidos', error });
  }
};

export const obtenerMetodosPago = async (req: Request, res: Response): Promise<void> => {
  try {
    const metodosPago = await Venta.findAll({
      attributes: ['metodoPago', [sequelize.fn('COUNT', sequelize.col('id')), 'cantidad']],
      group: ['metodoPago']
    });
    const metodos = metodosPago.map((metodo: any) => metodo.getDataValue('metodoPago'));
    const cantidad = metodosPago.map((metodo: any) => metodo.getDataValue('cantidad'));
    res.json({ metodos, cantidad });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los métodos de pago', error });
  }
};
