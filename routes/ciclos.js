/*
Ruta : api/ciclos
*/

const { Router } = require('express')
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos')
const {
  getCiclos,
  crearCiclo,
  actualizarCiclo,
  borrarCiclo,
  activarCiclo,
  getCicloById,
} = require('../controllers/ciclos')
const { validarAdminJWT } = require('../middlewares/validar-jwt')
const router = Router()

router.get('/', validarAdminJWT, getCiclos)
router.get('/:uid', validarAdminJWT, getCicloById)
router.post(
  '/',
  [
    validarAdminJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('clave', 'La clave es obligatoria').not().isEmpty(),
    check('descripcion', 'La descripción es obligatoria').not().isEmpty(),
    validarCampos,
  ],
  crearCiclo,
)

router.put(
  '/:id',
  [
    validarAdminJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('clave', 'La clave es obligatoria').not().isEmpty(),
    check('descripcion', 'La descripción es obligatoria').not().isEmpty(),
    check('lastEdited', 'La fecha de edición es obligatoria').not().isEmpty(),
    validarCampos,
  ],
  actualizarCiclo,
)

router.put(
  '/borrarCiclo/:id',
  [
    validarAdminJWT,
    check('lastEdited', 'La fecha de edición es obligatoria').not().isEmpty(),
    validarCampos,
  ],
  borrarCiclo,
)
router.put(
  '/activarCiclo/:id',
  [
    validarAdminJWT,
    check('lastEdited', 'La fecha de edición es obligatoria').not().isEmpty(),
    validarCampos,
  ],
  activarCiclo,
)

module.exports = router
