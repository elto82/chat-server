/*
path: api/login
*/
const { Router } = require("express");
const { createUser, login, renewToken } = require("../controllers/auth");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validarCampos");
const { validarJwt } = require("../middlewares/validarJwt");

const router = Router();

//crear nuevos usuarios
router.post(
  "/new",
  [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("name", "El nombre debe tener mas de 2 caracteres").isLength({
      min: 2,
    }),
    check("email", "El email es obligatorio").isEmail(),
    check("password", "El password es obligatorio").not().isEmpty(),
    check("password", "El password debe tener mas de 6 caracteres").isLength({
      min: 6,
    }),
    validarCampos,
  ],
  createUser
);

//login
router.post(
  "/",
  [
    check("email", "El email es obligatorio").isEmail(),
    check("password", "El password es obligatorio").not().isEmpty(),
    check("password", "El password debe tener mas de 6 caracteres").isLength({
      min: 6,
    }),
    validarCampos,
  ],
  login
);

//revalidar token
router.get("/renew", [validarJwt], renewToken);

module.exports = router;
