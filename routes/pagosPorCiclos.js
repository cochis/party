/*
Ruta : api/pagoPorCiclo
*/

const { Router } = require('express')
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos')
const {
  getPagoPorCiclos,
  crearPagoPorCiclo,
  actualizarPagoPorCiclo,
  borrarPagoPorCiclo,
  activarPagoPorCiclo,
  getPagoPorCicloById,
  getPagoPorCicloByCiclo,
} = require('../controllers/pagosPorCiclos')
const { validarAdminJWT } = require('../middlewares/validar-jwt')
const router = Router()

router.get('/', validarAdminJWT, getPagoPorCiclos)
router.get('/:uid', validarAdminJWT, getPagoPorCicloById)
router.get('/porciclo/:ciclo', validarAdminJWT, getPagoPorCicloByCiclo)
router.post(
  '/',
  [
    validarAdminJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('clave', 'La clave es obligatoria').not().isEmpty(),
    check('descripcion', 'La descripcion es obligatoria').not().isEmpty(),
    validarCampos,
  ],
  crearPagoPorCiclo,
)

router.put('/:id', validarAdminJWT, actualizarPagoPorCiclo)

router.put(
  '/borrarPago/:id',
  [
    validarAdminJWT,
    check('lastEdited', 'La fecha de edición es obligatoria').not().isEmpty(),
    validarCampos,
  ],
  borrarPagoPorCiclo,
)
router.put(
  '/activarPago/:id',
  [
    validarAdminJWT,
    check('lastEdited', 'La fecha de edición es obligatoria').not().isEmpty(),
    validarCampos,
  ],
  activarPagoPorCiclo,
)

module.exports = router
