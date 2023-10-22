# Socket Server

Este backend contiene todo lo necesario para configurar un servidor de express + socket.io.

# Aplicación de Chat en Node.js

Esta es una aplicación de chat en Node.js que proporciona autenticación de usuarios y mensajería en tiempo real mediante Socket.IO. La aplicación está diseñada para permitir a los usuarios registrarse, iniciar sesión y participar en conversaciones de chat en tiempo real.

## Tabla de Contenidos

- [Socket Server](#socket-server)
- [Aplicación de Chat en Node.js](#aplicación-de-chat-en-nodejs)
  - [Tabla de Contenidos](#tabla-de-contenidos)
  - [Tecnologías](#tecnologías)
  - [Instrucciones de Uso](#instrucciones-de-uso)
    - [Requisitos Previos](#requisitos-previos)
    - [Instalación](#instalación)

## Tecnologías

- Node.js
- Express.js
- MongoDB
- Socket.IO
- JSON Web Tokens (JWT)
- Mongoose (para interactuar con la base de datos)

## Instrucciones de Uso

### Requisitos Previos

Antes de ejecutar la aplicación, asegúrate de tener instalado lo siguiente:

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)

### Instalación

1. Clona este repositorio en tu máquina local:

  git clone https://github.com/elto82/chat-server

Navega al directorio del proyecto:

cd chat-server
Instala las dependencias del proyecto:

   ```
   npm install
   ```

Configura tus variables de entorno creando un archivo .env en la raíz del proyecto y agregando los valores necesarios. Aquí tienes un ejemplo:

   ```PORT=5001
DB_USER=tu_usuario_de_db
DB_PASSWORD=tu_contraseña_de_db
DB_CN_STRING=mongodb+srv://tu_usuario_de_db:tu_contraseña_de_db@cluster0.0x4lirq.mongodb.net/chatdb
SECRET_KEY=tu_clave_secreta
   ```

Ejecuta la aplicación:

   ```  
    npm start
El servidor debería estar funcionando en el puerto especificado (por ejemplo, http://localhost:5001).
   ```

Uso
Registro de Usuarios
Para crear una nueva cuenta de usuario:

Envía una solicitud POST a /api/login/new con los siguientes datos JSON:

   ```
   {
  "name": "Tu Nombre",
  "email": "tu.correo@example.com",
  "password": "tu_contraseña"
}
   ```

Si el registro es exitoso, recibirás una respuesta JSON que contiene los detalles del usuario y un token JWT.

Inicio de Sesión de Usuarios
Para iniciar sesión como un usuario existente:

Envía una solicitud POST a /api/login con los siguientes datos JSON:

   ```
  {
    "email": "tu.correo@example.com",
    "password": "tu_contraseña"
  }
   ```

Si las credenciales son válidas, recibirás una respuesta JSON con los detalles del usuario y un nuevo token JWT.

Chat en Tiempo Real
La aplicación admite chat en tiempo real entre usuarios. Puedes utilizar esta funcionalidad para:

Enviar y recibir mensajes de chat en tiempo real.
Recuperar el historial de chat con otros usuarios.
Ver una lista de usuarios en línea.
Para utilizar la funcionalidad de chat, la aplicación del lado del cliente debe establecer una conexión Socket.IO con el servidor. Para obtener instrucciones detalladas, consulta el código proporcionado.

Configuración
La configuración de la aplicación se encuentra en el archivo .env. Este archivo contiene variables importantes, como el puerto del servidor, la cadena de conexión a la base de datos y la clave secreta para la generación de tokens JWT.

Contribuciones
Si deseas contribuir a este proyecto, no dudes en enviar solicitudes de extracción (pull requests) o abrir (issues).

Licencia
Este proyecto está bajo la Licencia ISC.