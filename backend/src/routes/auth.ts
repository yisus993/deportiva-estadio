import { Router } from 'express';
import { forgotPassword, resetPassword } from '../controllers/user'; // Asegúrate de importar desde el archivo correcto

const router = Router();

router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

export default router;
