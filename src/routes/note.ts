import { Router } from 'express';
import { crearNota, obtenerNotas, actualizarNota, eliminarNota } from '../controllers/note';

const router = Router();

router.post('/crear', crearNota);
router.get('/', obtenerNotas);
router.put('/:id', actualizarNota);
router.delete('/:id', eliminarNota);

export default router;
