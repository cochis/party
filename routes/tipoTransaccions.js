/*
Ruta : api/tipoTransaccions
*/

const { Router } = require('express')
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos')
const {
  getTipoTransaccions,
  crearTipoTransaccion,
  actualizarTipoTransaccion,
  borrarTipoTransaccion,
  activarTipoTransaccion,
  getTipoTransaccionsById,
} = require('../controllers/tipoTransaccions')
const { validarAdminJWT } = require('../middlewares/validar-jwt')
const router = Router()

router.get('/', validarAdminJWT, getTipoTransaccions)
router.get('/:uid', validarAdminJWT, getTipoTransaccionsById)
router.post(
  '/',
  [
    validarAdminJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('clave', 'La clave es obligatoria').not().isEmpty(),
    check('descripcion', 'La descripcion es obligatoria').not().isEmpty(),
    validarCampos,
  ],
  crearTipoTransaccion,
)

router.put(
  '/:id',
  [
    validarAdminJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('clave', 'La clave es obligatoria').not().isEmpty(),
    check('descripcion', 'La descripcion es obligatoria').not().isEmpty(),
    check('lastEdited', 'La fecha de edición es obligatoria').not().isEmpty(),
    validarCampos,
  ],
  actualizarTipoTransaccion,
)

router.put(
  '/borrarTipoTransaccion/:id',
  [
    validarAdminJWT,
    check('lastEdited', 'La fecha de edición es obligatoria').not().isEmpty(),
    validarCampos,
  ],
  borrarTipoTransaccion,
)
router.put(
  '/activarTipoTransaccion/:id',
  [
    validarAdminJWT,
    check('lastEdited', 'La fecha de edición es obligatoria').not().isEmpty(),
    validarCampos,
  ],
  activarTipoTransaccion,
)

module.exports = router
