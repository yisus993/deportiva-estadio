import { Router } from 'express';
import { getClients, registerClient, deleteClient, updateClient, searchClients } from '../controllers/client';
import authMiddleware from '../middleware/auth'; // Importa el middleware de autenticación

const router = Router();

router.get('/api/clients', authMiddleware, getClients); // Ruta para obtener todos los clientes
router.post('/api/clients', authMiddleware, registerClient); // Ruta para agregar un nuevo cliente
router.delete('/api/clients/:id', authMiddleware, deleteClient); // Ruta para eliminar un cliente
router.put('/api/clients/:id', authMiddleware, updateClient); // Ruta para actualizar un cliente
router.get('/api/clients/search', authMiddleware, searchClients); // Nueva ruta para búsqueda de clientes

export default router;
