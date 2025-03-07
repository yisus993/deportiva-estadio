import { Router } from 'express';
import { createInvoice, getInvoices, getInvoiceById, updateInvoice, deleteInvoice } from '../controllers/invoice';

const router = Router();

router.post('/', createInvoice); // Ruta para crear una nueva factura
router.get('/', getInvoices); // Ruta para obtener todas las facturas
router.get('/:id', getInvoiceById); // Ruta para obtener una factura por ID
router.put('/:id', updateInvoice); // Ruta para actualizar una factura existente
router.delete('/:id', deleteInvoice); // Ruta para eliminar una factura existente

export default router;
