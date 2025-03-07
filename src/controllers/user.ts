import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { User } from '../models/user';
import jwt from 'jsonwebtoken';
import { Log } from '../models/log'; // Importa el modelo de logs
import { enviarEmail } from '../email/emailService';

export const getUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({
            msg: 'Error al obtener los usuarios.',
        });
    }
};

export const register = async (req: Request, res: Response): Promise<void> => {
    const { name, lastname, password, user, email, role, status } = req.body;

    const existingUser = await User.findOne({ where: { user: user } });

    if (existingUser) {
        res.status(400).json({
            msg: `Usuario ya existe con el nombre de usuario ${user}.`
        });
        return;
    }

    const passwordHash = await bcrypt.hash(password, 10);

    try {
        const newUser = await User.create({
            name: name,
            lastname: lastname,
            user: user,
            email: email,
            password: passwordHash,
            role: role,
            status: status
        });

        // Registro en logs
        await Log.create({
            user: user,
            action: 'register',
            details: `Usuario ${name} ${lastname} creado con éxito.`
        });

        res.json({
            msg: `Usuario ${name} ${lastname} creado con éxito...`
        });
    } catch (error) {
        res.status(400).json({
            msg: `Existe un error al crear el usuario ${name} ${lastname}.`
        });
    }
};

export const login = async (req: Request, res: Response): Promise<void> => {
    const { user, password } = req.body;

    const foundUser: any = await User.findOne({ where: { user: user } });

    if (!foundUser) {
        res.status(400).json({
            msg: `Usuario no existe con el nombre de usuario ${user}.`
        });
        return;
    }

    const passwordValid = await bcrypt.compare(password, foundUser.password);

    if (!passwordValid) {
        res.status(400).json({
            msg: `Contraseña incorrecta para ${user}.`
        });
        return;
    }

    if (foundUser.status === 0) {
        res.status(403).json({
            msg: `Usuario no puede iniciar sesión debido a su estado.`
        });
        return;
    }

    const token = jwt.sign({
        id: foundUser.id,
        user: foundUser.user,
        role: foundUser.role
    }, process.env['SECRET_KEY'] || '7MyYZd9Vq0Nll4gi5wVa', {
        expiresIn: '10h'
    });

    // Añadir registro en logs
    await Log.create({
        user: foundUser.user,
        action: 'login',
        details: `Usuario ${foundUser.user} inició sesión.`
    });

    res.json({ token });
};

export const logout = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = (req as any).user.user;

        // Registro en logs
        await Log.create({
            user: user,
            action: 'logout',
            details: `Usuario ${user} cerró sesión.`,
            timestamp: new Date() // Asegúrate de que se registre la fecha y hora
        });

        res.json({ message: 'Sesión cerrada exitosamente' });
    } catch (error) {
        console.error('Error al registrar el logout:', error);
        res.status(500).json({ message: 'Error al cerrar sesión' });
    }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    console.log(`Attempting to delete user with ID: ${id}`);

    try {
        const foundUser = await User.findByPk(id);

        if (!foundUser) {
            res.status(404).json({ msg: `Usuario con ID ${id} no encontrado.` });
            return;
        }

        await foundUser.destroy();

        // Registro en logs
        await Log.create({
            user: foundUser.user,
            action: 'delete',
            details: `Usuario con ID ${id} eliminado exitosamente.`
        });

        res.json({ msg: `Usuario con ID ${id} eliminado exitosamente.` });
    } catch (error) {
        res.status(500).json({ msg: `Error al eliminar el usuario con ID ${id}.` });
    }
};

export const updateUser = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { name, lastname, user, password, role, status } = req.body;

    try {
        const foundUser = await User.findByPk(id);

        if (!foundUser) {
            res.status(404).json({ msg: `Usuario con id ${id} no encontrado.` });
            return;
        }

        await foundUser.update({
            name: name,
            lastname: lastname,
            user: user,
            password: password,
            role: role,
            status: status
        });

        // Registro en logs
        await Log.create({
            user: user,
            action: 'update',
            details: `Usuario con ID ${id} actualizado con éxito.`
        });

        res.json({
            msg: `Usuario con id ${id} actualizado con éxito.`,
            user: foundUser
        });
    } catch (error) {
        res.status(500).json({ msg: `Error al actualizar el usuario con id ${id}.` });
    }
};


export const forgotPassword = async (req: Request, res: Response): Promise<void> => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ where: { email } });

        if (!user) {
            res.status(404).json({ message: 'Usuario no encontrado' });
            return;
        }

        const jwtSecret = process.env.JWT_SECRET || 'defaultSecret';
        const token = jwt.sign({ userId: user.id }, jwtSecret, { expiresIn: '1h' });
        const resetLink = `http://localhost:4200/reset-password/${token}`;

        await enviarEmail(email, 'Recuperación de contraseña', `
            <p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
            <a href="${resetLink}">${resetLink}</a>
        `);

        res.json({ message: 'Correo de recuperación enviado' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al enviar el correo de recuperación' });
    }
};

// Función para restablecer la contraseña
export const resetPassword = async (req: Request, res: Response): Promise<void> => {
    const { token, newPassword } = req.body;
    try {
        const jwtSecret = process.env.JWT_SECRET || 'defaultSecret';
        const decoded = jwt.verify(token, jwtSecret) as any;
        const user = await User.findByPk(decoded.userId);

        if (!user) {
            res.status(404).json({ message: 'Usuario no encontrado' });
            return;
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        (user as any).password = hashedPassword;
        await user.save();

        res.json({ message: 'Contraseña actualizada exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Token inválido o expirado' });
    }
};
