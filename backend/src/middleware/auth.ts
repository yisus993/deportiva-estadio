import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        res.status(401).json({ message: 'Acceso denegado. No se proporcionó un token.' });
        return;
    }

    try {
        const decoded = jwt.verify(token, process.env['SECRET_KEY'] || '7MyYZd9Vq0Nll4gi5wVa');
        (req as any).user = decoded; // Agrega la información del usuario a la solicitud
        next();
    } catch (error) {
        res.status(400).json({ message: 'Token inválido.' });
    }
};

export default authMiddleware;
