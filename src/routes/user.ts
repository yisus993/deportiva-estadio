import { Router } from 'express';
import { login, register, deleteUser, updateUser, getUsers, logout } from '../controllers/user';
import authMiddleware from '../middleware/auth';

const router = Router();

router.post('/api/user/register', authMiddleware, register);
router.post('/api/user/login', login);
router.post('/api/user/logout', authMiddleware, logout); // Nueva ruta para cerrar sesión
router.put('/api/user/:id', authMiddleware, updateUser);
router.delete('/api/user/:id', authMiddleware, deleteUser);
router.get('/api/users', authMiddleware, getUsers);

export default router;
