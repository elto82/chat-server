const {
  usuarioConectado,
  usuarioDesconectado,
  getUsers,
  savedMessage,
} = require("../controllers/sockets");
const { comprobarJWT } = require("../helpers/jwt");

class Sockets {
  constructor(io) {
    this.io = io;

    this.socketEvents();
  }

  socketEvents() {
    // On connection
    this.io.on("connection", async (socket) => {
      // console.log(socket.handshake.query["x-token"]);
      const [valido, uid] = comprobarJWT(socket.handshake.query["x-token"]);

      if (!valido) {
        console.log("socket no identificado");
        return socket.disconnect();
      }

      console.log("cliente conectado", uid);
      await usuarioConectado(uid);
      //unir al usuario a una sala de socket.io
      socket.join(uid);

      //validar token
      //si el token no es valido, desconectar
      //saber que user esta activo mediante el uid
      //emitit todos los usuarios conectados
      this.io.emit("usuarios-activos", await getUsers());
      //socket join, uid
      //escuchar cuando un cliente manda un mensaje
      socket.on("mensaje-personal", async (payload) => {
        // console.log(payload);
        const message = await savedMessage(payload);
        this.io.to(payload.for).emit("mensaje-personal", message);
        this.io.to(payload.from).emit("mensaje-personal", message);
      });
      //disconnect
      //marcar en db que el usuario se desconecto
      //emitir todos los usuarios conectados
      socket.on("disconnect", async () => {
        console.log("cliente desconectado", uid);
        await usuarioDesconectado(uid);
        this.io.emit("usuarios-activos", await getUsers());
      });
    });
  }
}

module.exports = Sockets;
