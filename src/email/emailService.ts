import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'testventas99321@gmail.com',
    pass: 'zqyk jubw cfmk qkof' // Usa la contraseña de aplicación generada
  }
});

export const enviarEmail = async (destinatario: string, asunto: string, contenido: string, attachments: any[] = []): Promise<void> => {
  try {
    const mailOptions = {
      from: 'Deportiva Estadio',
      to: destinatario,
      subject: asunto,
      html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          .container {
            width: 80%;
            max-width: 600px;
            margin: auto;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f9f9f9;
          }
          .header {
            text-align: center;
            padding-bottom: 20px;
          }
          .header img {
            max-width: 100px;
          }
          .content {
            text-align: center;
            padding: 20px;
          }
          .content h1 {
            color: #1f5fa7;
          }
          .content p {
            color: #333;
            font-size: 16px;
          }
          .footer {
            text-align: center;
            padding-top: 20px;
            font-size: 12px;
            color: #666;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <img src="cid:logo" alt="Deportiva Estadio" style="height: 100px;">
            <h1 style="margin: 0;">Deportiva Estadio</h1>
          </div>
          <div class="content">
            <h1>${asunto}</h1>
            <p>${contenido}</p>
          </div>
          <div class="footer">
            <p>Gracias por confiar en nosotros. ¡Esperamos verte pronto!</p>
          </div>
        </div>
      </body>
      </html>
    `,
      attachments: [
        { filename: 'logo.png', path: 'src/images/logo.png', cid: 'logo' }, // Asegúrate de que el logo esté en esta ruta
        ...attachments
      ]
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email enviado:', info.response);
  } catch (error) {
    console.error('Error al enviar el email:', error);
    throw new Error(`Error al enviar el correo: ${(error instanceof Error) ? error.message : 'Error desconocido'}`);
  }
};
