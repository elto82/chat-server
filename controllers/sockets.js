const Message = require("../models/message");
const User = require("../models/user");
const usuarioConectado = async (uid) => {
  const user = await User.findById(uid);
  user.online = true;
  await user.save();
  return user;
};

const usuarioDesconectado = async (uid) => {
  const user = await User.findById(uid);
  user.online = false;
  await user.save();
  return user;
};

const getUsers = async () => {
  const users = await User.find().sort("-online");
  return users;
};

const savedMessage = async (payload) => {
  try {
    const message = new Message(payload);
    await message.save();
    return message;
  } catch (error) {
    console.log(error);
    return false;
  }
};

module.exports = {
  usuarioConectado,
  usuarioDesconectado,
  getUsers,
  savedMessage,
};
