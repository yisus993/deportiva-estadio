import { Request, Response } from 'express';
import Anuncio from '../models/anuncio';
import Client from '../models/client';
import { enviarEmail } from '../email/emailService';

export const crearAnuncio = async (req: Request, res: Response): Promise<void> => {
  const { titulo, contenido } = req.body;

  try {
    console.log('Intentando crear un anuncio con título:', titulo);
    const anuncio = await Anuncio.create({ titulo, contenido });
    console.log('Anuncio creado exitosamente:', anuncio);

    // Obtener todos los correos electrónicos de los clientes
    const clientes = await Client.findAll({ attributes: ['email'] });
    const emails = clientes.map(cliente => cliente.getDataValue('email') as string);

    // Enviar el anuncio por correo electrónico a todos los clientes
    emails.forEach((email: string) => {
      enviarEmail(email, titulo, contenido);
    });

    res.status(201).json({ message: 'Anuncio creado y enviado exitosamente.' });
  } catch (error) {
    const errorMessage = (error as Error).message || 'Error desconocido';
    console.error('Error al crear anuncio:', errorMessage);
    res.status(500).json({ message: 'Error al crear anuncio.' });
  }
};

export const enviarAnuncio = async (req: Request, res: Response): Promise<void> => {
  const { anuncioId } = req.body;

  try {
    const anuncio = await Anuncio.findByPk(anuncioId);
    if (!anuncio) {
      res.status(404).send('Anuncio no encontrado.');
      return;
    }

    const clientes = await Client.findAll({ attributes: ['email'] });
    const emails = clientes.map(cliente => cliente.getDataValue('email') as string);

    try {
      emails.forEach((email: string) => {
        enviarEmail(email, anuncio.get('titulo') as string, anuncio.get('contenido') as string);
      });
      res.status(200).send('Anuncio enviado exitosamente.');
    } catch (error) {
      console.error('Error al enviar emails:', error);
      res.status(500).send('Error al enviar emails.');
    }
  } catch (error) {
    console.error('Error al obtener anuncio:', error);
    res.status(500).send('Error al obtener anuncio.');
  }
};

export const obtenerAnunciosEnviados = async (req: Request, res: Response): Promise<void> => {
  try {
    const anuncios = await Anuncio.findAll({ order: [['fecha', 'DESC']] });
    res.status(200).json(anuncios);
  } catch (error) {
    const errorMessage = (error as Error).message || 'Error desconocido';
    console.error('Error al obtener anuncios enviados:', errorMessage);
    res.status(500).json({ message: 'Error al obtener anuncios enviados.' });
  }
};
