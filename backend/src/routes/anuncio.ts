import { Router } from 'express';
import { crearAnuncio, obtenerAnunciosEnviados, enviarAnuncio } from '../controllers/anuncio';

const router = Router();

router.post('/crear', crearAnuncio);
router.post('/enviar', enviarAnuncio);
router.get('/enviados', obtenerAnunciosEnviados);

export default router;
