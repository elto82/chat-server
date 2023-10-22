const jwt = require("jsonwebtoken");

const generarJWT = (uid) => {
  return new Promise((resolve, reject) => {
    const payload = { uid };

    jwt.sign(
      payload,
      process.env.SECRET_KEY,
      {
        expiresIn: "100000h",
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("No se pudo generar el token");
        } else {
          resolve(token);
        }
      }
    );
  });
};

const comprobarJWT = (token = "") => {
  try {
    const { uid } = jwt.verify(token, process.env.SECRET_KEY);
    return [true, uid];
  } catch (error) {
    return [false, null];
  }
};

module.exports = {
  generarJWT,
  comprobarJWT,
};
