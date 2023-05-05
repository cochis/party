/*
Ruta : api/alumnos
*/

const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const {
  getAlumnos,
  crearAlumno,
  actualizarAlumno,
  borrarAlumno,
  activarAlumno,
  getAlumnoById,
  getAlumnosAll,
  getMyAlumno
} = require("../controllers/alumnos");
const { validarAdminJWT, validarJWT } = require("../middlewares/validar-jwt");
const router = Router();
router.get("/", validarAdminJWT, getAlumnos);
router.get("/all", validarAdminJWT, getAlumnosAll);
router.get("/:uid", validarAdminJWT, getAlumnoById);
router.get("/my/:uid", validarJWT, getMyAlumno);
router.post(
  "/",
  [
    validarAdminJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("apellidoPaterno", "El nombre es obligatorio").not().isEmpty(),
    check("clave", "La clave es obligatoria").not().isEmpty(),
    check("sexo", "El sexo es obligatorio").isMongoId(),
    check("fechaNacimiento", "La fecha de es obligatoria").not().isEmpty(),
    check("curp", "El cupr es obligatorio").not().isEmpty(),
    check("nacionalidad", "la nacionalidad es obligatoria").not().isEmpty(),
    check("entidadNacimiento", "La entidad de nacimiento es obligatoria")
      .not()
      .isEmpty(),
    check("tipoSanguineo", "El tipo sanguineo es obligatorio").isMongoId(),
  ],
  crearAlumno
);

router.put(
  "/:id",
  [
    validarAdminJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("apellidoPaterno", "El nombre es obligatorio").not().isEmpty(),
    check("clave", "La clave es obligatoria").not().isEmpty(),
    check("sexo", "El sexo es obligatorio").isMongoId(),
    check("fechaNacimiento", "La fecha de es obligatoria").not().isEmpty(),
    check("curp", "El cupr es obligatorio").not().isEmpty(),
    check("nacionalidad", "la nacionalidad es obligatoria").not().isEmpty(),
    check("entidadNacimiento", "La entidad de nacimiento es obligatoria")
      .not()
      .isEmpty(),
    check("tipoSanguineo", "El tipo sanguineo es obligatorio").isMongoId(),
    check("lastEdited", "La fecha de edición es obligatoria").not().isEmpty(),
    validarCampos,
  ],
  actualizarAlumno
);

router.put(
  "/borrarAlumno/:id",
  [
    validarAdminJWT,
    check("lastEdited", "La fecha de edición es obligatoria").not().isEmpty(),
    validarCampos,
  ],
  borrarAlumno
);
router.put(
  "/activarAlumno/:id",
  [
    validarAdminJWT,
    check("lastEdited", "La fecha de edición es obligatoria").not().isEmpty(),
    validarCampos,
  ],
  activarAlumno
);

module.exports = router;
