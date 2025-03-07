import { Request, Response } from 'express';
import Invoice from '../models/invoice';
import Client from '../models/client';
import { Product } from '../models/product'; // Importar modelo de Producto correctamente

export const createInvoice = async (req: Request, res: Response) => {
    try {
        const { clientId, amount, description, items, iva } = req.body;
        console.log('Datos recibidos del frontend:', req.body);

        // Convertir el valor de IVA a "SI" o "NO"
        const ivaValue = iva ? 'SI' : 'NO';

        // Crear la factura en la base de datos
        const invoice = await Invoice.create({
            clientId,
            amount,
            description,
            items, // Guardar los productos y cantidades
            iva: ivaValue // Guardar el campo IVA como "SI" o "NO"
        });

        res.json(invoice);
        console.log('La factura fue guardada en la base de datos'); // Añadir log para confirmar el guardado
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la factura', error });

        if (error instanceof Error) {
            console.error('Error al crear la factura:', error.message, error.stack); // Añadir detalles del error
        } else {
            console.error('Error al crear la factura:', error); // Log para errores de tipo unknown
        }
    }
};

export const getInvoices = async (req: Request, res: Response) => {
    try {
        const invoices = await Invoice.findAll({
            include: [Client]
        });
        res.json(invoices);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las facturas', error });
    }
};

export const getInvoiceById = async (req: Request, res: Response) => {
    try {
        const invoice = await Invoice.findByPk(req.params.id, {
            include: [Client]
        });
        res.json(invoice);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la factura', error });
    }
};

export const updateInvoice = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updatedInvoice = await Invoice.update(req.body, {
            where: { id }
        });
        res.json(updatedInvoice);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la factura', error });
    }
};

export const deleteInvoice = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await Invoice.destroy({ where: { id } });
        res.json({ message: 'Factura eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la factura', error });
    }
};
