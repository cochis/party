/*
Ruta : api/search/:busqueda
*/

const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { getTodo, getDocumentosColeccion } = require("../controllers/busquedas");
const { validarAdminJWT } = require("../middlewares/validar-jwt");
const router = Router();

router.get("/:busqueda", validarAdminJWT, getTodo);
router.get(
  "/coleccion/:tabla/:busqueda",
  validarAdminJWT,
  getDocumentosColeccion
);

module.exports = router;
