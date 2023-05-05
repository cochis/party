/*
Ruta : api/cursos
*/

const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const {
  getCursos,
  crearCurso,
  actualizarCurso,
  borrarCurso,
  activarCurso,
  getCursoById,
  getCursosAll
} = require("../controllers/cursos");
const { validarAdminJWT } = require("../middlewares/validar-jwt");
const router = Router();

router.get("/", validarAdminJWT, getCursos);
router.get("/all", validarAdminJWT, getCursosAll);
router.get("/:uid", validarAdminJWT, getCursoById);
router.post(
  "/",
  [
    validarAdminJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("clave", "La clave es obligatoria").not().isEmpty(),
    check("ciclo", "El ciclo es obligatorio").not().isEmpty(),
    check("grado", "El grado es obligatorio").not().isEmpty(),
    check("grupo", "El grupo es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  crearCurso
);

router.put(
  "/:id",
  [
    validarAdminJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("clave", "La clave es obligatoria").not().isEmpty(),
    check("ciclo", "El ciclo es obligatorio").not().isEmpty(),
    check("grado", "El grado es obligatorio").not().isEmpty(),
    check("grupo", "El grupo es obligatorio").not().isEmpty(),
    check("lastEdited", "El grupo es obligatorio").not().isEmpty(),
    check("lastEdited", "La fecha de edición es obligatoria").not().isEmpty(),
    validarCampos,
  ],
  actualizarCurso
);

router.put(
  "/borrarCurso/:id",
  [
    validarAdminJWT,
    check("lastEdited", "La fecha de edición es obligatoria").not().isEmpty(),
    validarCampos,
  ],
  borrarCurso
);
router.put(
  "/activarCurso/:id",
  [
    validarAdminJWT,
    check("lastEdited", "La fecha de edición es obligatoria").not().isEmpty(),
    validarCampos,
  ],
  activarCurso
);

module.exports = router;
