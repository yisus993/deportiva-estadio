import { Router } from 'express';
import { registrarVenta } from '../controllers/venta';
import { getProducts } from '../controllers/product'; // Importar la función para obtener productos
import authMiddleware from '../middleware/auth';

const router = Router();

router.post('/registrar', authMiddleware, registrarVenta); // Ruta para registrar una venta
router.get('/getAllProducts', getProducts); // Ruta para obtener todos los productos

export default router;
