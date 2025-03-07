import { Request, Response } from 'express';
import Note from '../models/note';

export const crearNota = async (req: Request, res: Response): Promise<void> => {
  const { titulo, contenido } = req.body;

  try {
    const nuevaNota = await Note.create({ titulo, contenido });
    res.status(201).json(nuevaNota);
  } catch (error) {
    console.error('Error al crear la nota:', error);
    res.status(500).json({ message: 'Error al crear la nota' });
  }
};

export const obtenerNotas = async (req: Request, res: Response): Promise<void> => {
  try {
    const notas = await Note.findAll();
    res.status(200).json(notas);
  } catch (error) {
    console.error('Error al obtener las notas:', error);
    res.status(500).json({ message: 'Error al obtener las notas' });
  }
};

export const actualizarNota = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { titulo, contenido } = req.body;

  try {
    const nota = await Note.findByPk(id);
    if (!nota) {
      res.status(404).json({ message: 'Nota no encontrada' });
      return;
    }
    await nota.update({ titulo, contenido });
    res.status(200).json(nota);
  } catch (error) {
    console.error('Error al actualizar la nota:', error);
    res.status(500).json({ message: 'Error al actualizar la nota' });
  }
};

export const eliminarNota = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const nota = await Note.findByPk(id);
    if (!nota) {
      res.status(404).json({ message: 'Nota no encontrada' });
      return;
    }
    await nota.destroy();
    res.status(200).json({ message: 'Nota eliminada' });
  } catch (error) {
    console.error('Error al eliminar la nota:', error);
    res.status(500).json({ message: 'Error al eliminar la nota' });
  }
};
