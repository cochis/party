/*
Ruta : api/maestros
*/

const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const {
  getMaestros,
  crearMaestro,
  actualizarMaestro,
  borrarMaestro,
  activarMaestro,
  getMaestroById,
  getMaestrosAll,
  getMyMaestro
} = require("../controllers/maestros");
const { validarAdminJWT,validarJWT } = require("../middlewares/validar-jwt");
const router = Router();

router.get("/", validarAdminJWT, getMaestros);
router.get("/all", validarAdminJWT, getMaestrosAll);
router.get("/:uid", validarAdminJWT, getMaestroById);
router.get("/my/:uid", validarJWT, getMyMaestro);
router.post(
  "/",
  [
    validarAdminJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("clave", "La clave es obligatoria").not().isEmpty(),
    check("nacionalidad", "La nacionalidad es obligatoria").not().isEmpty(),
    check("fechaNacimiento", "La fechaNacimiento es obligatoria")
      .not()
      .isEmpty(),
    check("entidadNacimiento", "La entidadNacimiento es obligatoria")
      .not()
      .isEmpty(),
    check("curp", "El CURP es obligatorio").not().isEmpty(),
    check("email", "El correoElectronico es obligatorio").not().isEmpty(),
    check("gradoMaximoEstudios", "El grado maximo de estudios es obligatorio")
      .not()
      .isEmpty(),
    check("estadoCivil", "El estado civil es obligatorio").not().isEmpty(),
    check("calle", "La calle es obligatoria").not().isEmpty(),
    check("colonia", "La colonia es obligatoria").not().isEmpty(),
    check("codigoPostal", "El codigo postal es obligatorio").not().isEmpty(),
    check("entreCalles", "Las entre calles son obligatorias").not().isEmpty(),

    validarCampos,
  ],
  crearMaestro
);

router.put(
  "/:id",
  [
    validarAdminJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("clave", "La clave es obligatoria").not().isEmpty(),
    check("nacionalidad", "La nacionalidad es obligatoria").not().isEmpty(),
    check("fechaNacimiento", "La fechaNacimiento es obligatoria")
      .not()
      .isEmpty(),
    check("entidadNacimiento", "La entidadNacimiento es obligatoria")
      .not()
      .isEmpty(),
    check("curp", "El CURP es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").not().isEmpty(),
    check("gradoMaximoEstudios", "El grado maximo de estudios es obligatorio")
      .not()
      .isEmpty(),
    check("estadoCivil", "El estado civil es obligatorio").not().isEmpty(),
    check("calle", "La calle es obligatoria").not().isEmpty(),
    check("colonia", "La colonia es obligatoria").not().isEmpty(),
    check("codigoPostal", "El codigo postal es obligatorio").not().isEmpty(),
    check("entreCalles", "Las entrecalles son obligatorias").not().isEmpty(),
    check("lastEdited", "La fecha de edición es obligatoria").not().isEmpty(),
    validarCampos,
  ],
  actualizarMaestro
);

router.put(
  "/borrarMaestro/:id",
  [
    validarAdminJWT,
    check("lastEdited", "La fecha de edición es obligatoria").not().isEmpty(),
    validarCampos,
  ],
  borrarMaestro
);
router.put(
  "/activarMaestro/:id",
  [
    validarAdminJWT,
    check("lastEdited", "La fecha de edición es obligatoria").not().isEmpty(),
    validarCampos,
  ],
  activarMaestro
);

module.exports = router;
