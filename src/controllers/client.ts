import { Request, Response } from 'express';
import Client from '../models/client';
import { Op } from 'sequelize';
import sequelize from '../database/connection';
import { LogService } from '../services/logService'; // Importa el servicio de logs

// Obtener todos los clientes
export const getClients = async (req: Request, res: Response) => {
    const clients = await Client.findAll();
    res.json(clients);
};

// Registrar un nuevo cliente
export const registerClient = async (req: Request, res: Response) => {
    const client = await Client.create(req.body);
    const currentUser = (req as any).user.user; // Obtener el usuario actual de la solicitud
    await LogService.createLog(currentUser, 'Registrar Cliente', `Cliente registrado: ${client.getDataValue('name')}`); // Registrar log
    res.json(client);
};

// Actualizar un cliente
export const updateClient = async (req: Request, res: Response) => {
    await Client.update(req.body, { where: { id: req.params.id } });
    const updatedClient = await Client.findByPk(req.params.id);
    if (updatedClient) {
        const currentUser = (req as any).user.user; // Obtener el usuario actual de la solicitud
        await LogService.createLog(currentUser, 'Actualizar Cliente', `Cliente actualizado: ${updatedClient.getDataValue('name')}`); // Registrar log
    }
    res.json(updatedClient);
};

// Eliminar un cliente
export const deleteClient = async (req: Request, res: Response) => {
    const client = await Client.findByPk(req.params.id);
    if (!client) {
        res.status(404).json({ msg: `Cliente con id ${req.params.id} no encontrado.` });
        return;
    }

    const currentUser = (req as any).user.user; // Obtener el usuario actual de la solicitud
    const clientName = client.getDataValue('name'); // Obtener el nombre del cliente

    await Client.destroy({ where: { id: req.params.id } });
    await LogService.createLog(currentUser, 'Eliminar Cliente', `Cliente eliminado con ID: ${req.params.id}, Nombre: ${clientName}`); // Registrar log con nombre

    res.sendStatus(204);
};

// Buscar clientes
export const searchClients = async (req: Request, res: Response) => {
    const term = req.query.term as string;
    const clients = await Client.findAll({
        where: {
            [Op.or]: [
                { name: { [Op.like]: `%${term}%` } },
                { phone: { [Op.like]: `%${term}%` } },
                { email: { [Op.like]: `%${term}%` } }
            ]
        }
    });
    res.json(clients);
};

// Obtener la cantidad de clientes registrados por día
export const obtenerClientesRegistradosDia = async (req: Request, res: Response): Promise<void> => {
    try {
      const clientes = await Client.findAll({
        attributes: [
          [sequelize.fn('DATE', sequelize.col('createdAt')), 'fecha'],
          [sequelize.fn('COUNT', sequelize.col('id')), 'cantidadClientes']
        ],
        group: ['fecha']
      });
      const fechas = clientes.map((cliente: any) => cliente.getDataValue('fecha'));
      const cantidadClientes = clientes.map((cliente: any) => cliente.getDataValue('cantidadClientes'));
      res.json({ fechas, cantidadClientes });
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener los clientes registrados por día', error });
    }
  };
