/*
Ruta : api/tipoSanguineos
*/

const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const {
  getTipoSanguineos,
  crearTipoSanguineo,
  actualizarTipoSanguineo,
  borrarTipoSanguineo,
  activarTipoSanguineo,
  getTipoSanguineoById,
} = require("../controllers/tipoSanguineos");
const { validarAdminJWT } = require("../middlewares/validar-jwt");
const router = Router();

router.get("/", validarAdminJWT, getTipoSanguineos);
router.get("/:uid", validarAdminJWT, getTipoSanguineoById);
router.post(
  "/",
  [
    validarAdminJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("clave", "La clave es obligatoria").not().isEmpty(),
    check("descripcion", "La descripcion es obligatoria").not().isEmpty(),
    validarCampos,
  ],
  crearTipoSanguineo
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
  actualizarTipoSanguineo
);

router.put(
  "/borrarTipoSanguineo/:id",
  [
    validarAdminJWT,
    check("lastEdited", "La fecha de edición es obligatoria").not().isEmpty(),
    validarCampos,
  ],
  borrarTipoSanguineo
);
router.put(
  "/activarTipoSanguineo/:id",
  [
    validarAdminJWT,
    check("lastEdited", "La fecha de edición es obligatoria").not().isEmpty(),
    validarCampos,
  ],
  activarTipoSanguineo
);

module.exports = router;
