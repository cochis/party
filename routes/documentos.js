/*
Ruta : api/documentos
*/

const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const {
  getDocumentos,
  crearDocumento,
  actualizarDocumento,
  borrarDocumento,
  activarDocumento,
  getDocumentoById,
} = require("../controllers/documentos");
const { validarAdminJWT } = require("../middlewares/validar-jwt");
const router = Router();

router.get("/", validarAdminJWT, getDocumentos);
router.get("/:uid", validarAdminJWT, getDocumentoById);
router.post(
  "/",
  [
    validarAdminJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("clave", "La clave es obligatoria").not().isEmpty(),
    check("descripcion", "La descripcion es obligatoria").not().isEmpty(),
    validarCampos,
  ],
  crearDocumento
);

router.put(
  "/:id",
  [
    validarAdminJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("clave", "La clave es obligatoria").not().isEmpty(),
    check("descripcion", "La descripcion es obligatoria").not().isEmpty(),
    check("lastEdited", "La fecha de edición es obligatoria").not().isEmpty(),
    validarCampos,
  ],
  actualizarDocumento
);

router.put(
  "/borrarDocumento/:id",
  [
    validarAdminJWT,
    check("lastEdited", "La fecha de edición es obligatoria").not().isEmpty(),
    validarCampos,
  ],
  borrarDocumento
);
router.put(
  "/activarDocumento/:id",
  [
    validarAdminJWT,
    check("lastEdited", "La fecha de edición es obligatoria").not().isEmpty(),
    validarCampos,
  ],
  activarDocumento
);

module.exports = router;
