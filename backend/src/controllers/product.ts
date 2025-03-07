import { Request, Response } from "express";
import { Product } from "../models/product";
import { LogService } from '../services/logService'; // Importa el servicio de logs
// Función para obtener todos los productos
export const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.findAll(); // Obtener todos los productos
        res.json(products); // Devolver los productos directamente en formato array
    } catch (error) {
        res.status(500).json({
            msg: 'Error al obtener los productos.',
        });
    }
};

// Registrar un nuevo producto
export const registerProduct = async (req: Request, res: Response) => {
    const { name, quantity, price } = req.body;
    const currentUser = (req as any).user?.user; // Obtener el usuario actual de la solicitud

    try {
        const newProduct = await Product.create({
            name: name,
            quantity: quantity,
            price: price,
            status: 1,
        });
        
        await LogService.createLog(currentUser, 'Registrar Producto', `Producto registrado: ${name}, Cantidad: ${quantity}`); // Registrar log con cantidad

        res.json({
            msg: `Producto ${name} agregado con éxito.`,
            product: newProduct
        });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({
                msg: `Error al agregar el producto ${name}.`,
                error: error.message
            });
        } else {
            res.status(400).json({
                msg: `Error desconocido al agregar el producto ${name}.`
            });
        }
    }
};

// Eliminar un producto
export const deleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    const currentUser = (req as any).user?.user; // Obtener el usuario actual de la solicitud

    try {
        const product = await Product.findByPk(id);

        if (!product) {
            res.status(404).json({ msg: `Producto con id ${id} no encontrado.` });
            return;
        }

        const productName = product.getDataValue('name');
        const productQuantity = product.getDataValue('quantity');

        await product.destroy();
        await LogService.createLog(currentUser, 'Eliminar Producto', `Producto eliminado: ${productName}`); // Registrar log con cantidad

        res.json({ msg: `Producto con id ${id} eliminado exitosamente.` });
    } catch (error) {
        res.status(500).json({ msg: `Error al eliminar el producto con id ${id}.` });
    }
};



// Actualizar un producto
export const updateProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, quantity, price, status } = req.body;
    const currentUser = (req as any).user?.user; // Obtener el usuario actual de la solicitud

    try {
        const product = await Product.findByPk(id);

        if (!product) {
            res.status(404).json({ msg: `Producto con id ${id} no encontrado.` });
            return;
        }

        const oldQuantity = product.getDataValue('quantity');

        await product.update({
            name: name,
            quantity: quantity,
            price: price,
            status: status
        });

        await LogService.createLog(currentUser, 'Actualizar Producto', `Producto actualizado: ${name}, Cantidad anterior: ${oldQuantity}, Cantidad nueva: ${quantity}`); // Registrar log con cantidad antes y después

        res.json({
            msg: `Producto con id ${id} actualizado con éxito.`,
            product
        });
    } catch (error) {
        res.status(500).json({ msg: `Error al actualizar el producto con id ${id}.` });
    }
};

