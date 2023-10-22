/*
path: api/mensajes/:id
*/
const { Router } = require("express");
const { validarJwt } = require("../middlewares/validarJwt");
const { obtenerChat } = require("../controllers/mensajes");

const router = Router();

//crear nuevos usuarios
router.get("/:de", validarJwt, obtenerChat);

module.exports = router;
