<<<<<<< HEAD
<<<<<<< HEAD
# Proyecto Deportiva Estadio

Este proyecto incluye un frontend desarrollado con Angular y un backend construido con Node.js. La aplicación está diseñada para gestionar información deportiva, como usuarios, productos, ventas y más.

## **Tabla de Contenidos**
- [Proyecto Deportiva Estadio](#proyecto-deportiva-estadio)
  - [**Tabla de Contenidos**](#tabla-de-contenidos)
  - [**Requisitos**](#requisitos)
  - [**Instalación Backend**](#instalación-backend)
    - [**Backend**](#backend)
  - [**Instalación Frontend**](#instalación-frontend)
  - [**COSAS EXTRAS**](#cosas-extras)
  - [**Contribuciones**](#contribuciones)
- [deportiva-estadio](#deportiva-estadio)

---

## **Requisitos**

Para ejecutar este proyecto, asegúrate de tener instalados los siguientes programas y herramientas:

- [Node.js](https://nodejs.org/) >= 16.0.0
- [Angular CLI](https://angular.io/cli) >= 15.0.0
- [MySQL](https://www.mysql.com/) (para la base de datos)
- [Postman](https://www.postman.com/) (opcional, para probar los endpoints del backend)

---

## **Instalación Backend**

Sigue estos pasos para instalar el proyecto tanto en el frontend como en el backend:

### **Backend**
1. Ve a la carpeta `backend`:
   ```bash
   cd backend
2. Instala las dependencias necesarias:
 bash
  npm install
3. Crea un archivo .env en la carpeta backend y agrega las claves necesarias, por ejemplo:
 PORT=3025
 SECRET_KEY="tu_clave_secreta"
 JWT_SECRET="tu_clave_para_jwt"
 EMAIL_USER="tu_correo@gmail.com"
 EMAIL_PASS="tu_contraseña_de_aplicación"
4. Inicia el servidor de desarrollo:
 bash
 npm run dev
5. Si necesitas compilar TypeScript, ejecuta en otra terminal:
 npm run typescript


## **Instalación Frontend**
1. Ve a la carpeta frontend (llamada deportiva):
 bash
 cd deportiva
2. Instala las dependencias necesarias:
 bash
 npm install
3. Inicia el servidor de desarrollo:
 bash
 ng serve
 Abre tu navegador y accede a http://localhost:4200 para ver el frontend en acción.

## **COSAS EXTRAS**
1. Las keys de .env que son estas
PORT=3025
SECRET_KEY="tu_clave_secreta"
JWT_SECRET="tu_clave_para_jwt"
EMAIL_USER="tu_correo@gmail.com"
EMAIL_PASS="tu_contraseña_de_aplicación"

2. Tambien en email/emailservice cosas que Agregar
- Hay tienes que poner en el apartado de service tu corre si es gmail o que tipo de corre usaste
- Tambien user: tienes que poner tu correo y en pass: usa la contraseña de aplicacion generada eso es directamente tu cuenta de google info en internet xd
Ejemplo de como tiene qu elucir lo de email (Donde se estaran mandando los tickets y todo lo de email del negocio)
 service: "Gmail", // O el servicio de correo que uses
 user: "tu_correo@gmail.com",
 pass: "tu_contraseña_de_aplicación"


puedes llenarlas a tu gusto o te puedo pasar las que yo use

3. Como se ejecutar
   - Una terminal para el frontend (ng serve)
   - Terminal para backend (npm run dev)
   - Terminal para backend (npm run typescript)
  
## **Contribuciones**  
Contribuciones son bienvenidas. Sigue estos pasos para contribuir al proyecto:

1. Haz un fork del repositorio.

2. Crea una nueva rama:
 Bash:
 git checkout -b feature/mi-feature
3. Realiza tus cambios y haz un commit:
 Bash:
 git commit -m "Descripción de mi cambio"
4. Envía un pull request al repositorio principal.

=======
# deportiva-estadio
Proyecto Angular con backend en Node.js para gestión de ventas ejemplo (DEPORTIVA ESTADIO)
>>>>>>> f49c29c9a957cc7f82995a18f268a063dc5f848e
