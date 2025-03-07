import { Router } from 'express';
import { getProducts, registerProduct, deleteProduct, updateProduct } from '../controllers/product';
import authMiddleware from '../middleware/auth'; // Importa el middleware de autenticación

const router = Router();

router.get('/api/product/getAllProducts', getProducts); // Ruta para obtener todos los productos
router.post('/api/product/register', authMiddleware, registerProduct); // Ruta para agregar un nuevo producto
router.delete('/api/product/:id', authMiddleware, deleteProduct); // Ruta para eliminar un producto
router.put('/api/product/:id', authMiddleware, updateProduct); // Ruta para actualizar un producto

export default router;
