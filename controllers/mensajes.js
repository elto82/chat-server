const Message = require("../models/message");

const obtenerChat = async (req, res) => {
  const miId = req.uid;
  const mensajeDe = req.params.de;

  const last30 = await Message.find({
    $or: [
      { from: miId, for: mensajeDe },
      { from: mensajeDe, for: miId },
    ],
  })
    .sort({ createdAt: "asc" })
    .limit(30);

  res.json({
    ok: true,
    msg: "get-chat",
    miId,
    mensajeDe,
    mensajes: last30,
  });
};
module.exports = { obtenerChat };
