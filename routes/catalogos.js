/*
Ruta : api/catalogos
*/

const { Router } = require('express')
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos')
const {
  getCatalogos,
  crearCatalogo,
  actualizarCatalogo,
  borrarCatalogo,
  activarCatalogo,
  getCatalogoById,
  getCatalogoByTipo,
} = require('../controllers/catalogos')
const { validarAdminJWT } = require('../middlewares/validar-jwt')
const router = Router()

router.get('/', validarAdminJWT, getCatalogos)
router.get('/:uid', validarAdminJWT, getCatalogoById)
router.get('/tipo/:tipo', validarAdminJWT, getCatalogoByTipo)
router.post(
  '/',
  [
    validarAdminJWT,
    check('tipo', 'El tipo es obligatorio').not().isEmpty(),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('clave', 'La clave es obligatoria').not().isEmpty(),
    check('descripcion', 'La descripción es obligatoria').not().isEmpty(),
    validarCampos,
  ],
  crearCatalogo,
)

router.put(
  '/:id',
  [
    validarAdminJWT,
    check('tipo', 'El tipo es obligatorio').not().isEmpty(),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('clave', 'La clave es obligatoria').not().isEmpty(),
    check('descripcion', 'La descripción es obligatoria').not().isEmpty(),
    check('lastEdited', 'La fecha de edición es obligatoria').not().isEmpty(),
    validarCampos,
  ],
  actualizarCatalogo,
)

router.put(
  '/borrarCatalogo/:id',
  [
    validarAdminJWT,
    check('lastEdited', 'La fecha de edición es obligatoria').not().isEmpty(),
    validarCampos,
  ],
  borrarCatalogo,
)
router.put(
  '/activarCatalogo/:id',
  [
    validarAdminJWT,
    check('lastEdited', 'La fecha de edición es obligatoria').not().isEmpty(),
    validarCampos,
  ],
  activarCatalogo,
)

module.exports = router
