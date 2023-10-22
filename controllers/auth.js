const { response } = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { generarJWT } = require("../helpers/jwt");

//crear user
const createUser = async (req, res = response) => {
  try {
    const { email, password } = req.body;

    //verificar si existe email
    const existeEmail = await User.findOne({ email });
    if (existeEmail) {
      return res.status(400).json({
        ok: false,
        msg: "El correo ya existe",
      });
    }

    const user = new User(req.body);

    //encriptar contraseña
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    //guardar usuario en DB
    await user.save();

    //generar token
    const token = await generarJWT(user.id);

    res.json({
      ok: true,
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error inesperado",
    });
  }
};

//login
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    //verificar si existe el correo
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: "El usuario o contraseña no es valida",
      });
    }

    //validar contraseña
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "La contraseña o  usuario  no es valida",
      });
    }

    //generar token
    const token = await generarJWT(user.id);

    res.json({
      ok: true,
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error inesperado",
    });
  }
};

//renobar token
const renewToken = async (req, res) => {
  try {
    const uid = req.uid;

    //generar token
    const token = await generarJWT(uid);

    //obtener usuario por uid
    const user = await User.findById(uid);

    res.json({
      ok: true,
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error inesperado",
    });
  }
};

module.exports = {
  createUser,
  login,
  renewToken,
};
