import { Router } from 'express';
import { LogService } from '../services/logService';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const logs = await LogService.getAllLogs();
    res.json(logs);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los logs' });
  }
});

router.post('/', async (req, res) => {
  const { user, action, details } = req.body;
  try {
    const log = await LogService.createLog(user, action, details);
    res.status(201).json(log);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el log' });
  }
});

export default router;
