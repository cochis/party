/*
Ruta : api/grados
*/

const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const {
  getGrados,
  crearGrado,
  actualizarGrado,
  borrarGrado,
  activarGrado,
  getGradosById,
} = require("../controllers/grados");
const { validarAdminJWT } = require("../middlewares/validar-jwt");
const router = Router();

router.get("/", validarAdminJWT, getGrados);
router.get("/:uid", validarAdminJWT, getGradosById);
router.post(
  "/",
  [
    validarAdminJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("clave", "La clave es obligatoria").not().isEmpty(),
    check("descripcion", "La descripcion es obligatoria").not().isEmpty(),
    validarCampos,
  ],
  crearGrado
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
  actualizarGrado
);

router.put(
  "/borrarGrado/:id",
  [
    validarAdminJWT,
    check("lastEdited", "La fecha de edición es obligatoria").not().isEmpty(),
    validarCampos,
  ],
  borrarGrado
);
router.put(
  "/activarGrado/:id",
  [
    validarAdminJWT,
    check("lastEdited", "La fecha de edición es obligatoria").not().isEmpty(),
    validarCampos,
  ],
  activarGrado
);

module.exports = router;
