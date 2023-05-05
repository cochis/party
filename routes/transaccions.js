/*
Ruta : api/transaccions
*/

const { Router } = require('express')
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos')
const {
  getTransaccions,
  crearTransaccion,
  actualizarTransaccion,
  borrarTransaccion,
  activarTransaccion,
  getTransaccionById,
} = require('../controllers/transaccions')
const { validarJWT } = require('../middlewares/validar-jwt')
const router = Router()

router.get('/', validarJWT, getTransaccions)
router.get('/:uid', validarJWT, getTransaccionById)
router.post(
  '/',
  [
    validarJWT,
    check('fechaExpedicion', 'la fecha de expedicion es obligatoria')
      .not()
      .isEmpty(),
    check('lugarExpedicion', 'El lugar de expedicion es obligatorio')
      .not()
      .isEmpty(),
    check('alumno', 'El alumno es obligatorio').not().isEmpty(),
    check('descripcion', 'La descripción es obligatoria').not().isEmpty(),
    check('precio', 'El precio es obligatorio').not().isEmpty(),
    check('metodoPago', 'El metodo de pago es obligatorio').not().isEmpty(),

    validarCampos,
  ],
  crearTransaccion,
)

router.put(
  '/:id',
  [
    validarJWT,
    check('fechaExpedicion', 'la fecha de expedicion es obligatoria')
      .not()
      .isEmpty(),
    check('lugarExpedicion', 'El lugar de expedicion es obligatorio')
      .not()
      .isEmpty(),
    check('alumno', 'El alumno es obligatorio').not().isEmpty(),
    check('descripcion', 'La descripción es obligatoria').not().isEmpty(),
    check('precio', 'El precio es obligatorio').not().isEmpty(),
    check('metodoPago', 'El metodo de pago es obligatorio').not().isEmpty(),
    check('lastEdited', 'La fecha de edición es obligatoria').not().isEmpty(),
    validarCampos,
  ],
  actualizarTransaccion,
)

router.put(
  '/borrarTransaccion/:id',
  [
    validarJWT,
    check('lastEdited', 'La fecha de edición es obligatoria').not().isEmpty(),
    validarCampos,
  ],
  borrarTransaccion,
)
router.put(
  '/activarTransaccion/:id',
  [
    validarJWT,
    check('lastEdited', 'La fecha de edición es obligatoria').not().isEmpty(),
    validarCampos,
  ],
  activarTransaccion,
)

module.exports = router
