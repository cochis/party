/*
Ruta : api/menus
*/

const { Router } = require('express')
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos')
const {
  getMenus,
  crearMenu,
  actualizarMenu,
  borrarMenu,
  activarMenu,
  getMenuById,
} = require('../controllers/menus')
const { validarAdminJWT } = require('../middlewares/validar-jwt')
const router = Router()

router.get('/', validarAdminJWT, getMenus)
router.get('/:uid', validarAdminJWT, getMenuById)
router.post(
  '/',
  [
    validarAdminJWT,
    check('titulo', 'El titulo es obligatorio').not().isEmpty(),
    check('icon', 'El icon es obligatorio').not().isEmpty(),
    check('roles', 'Los roles son obligatorios').not().isEmpty(),
    check('submenu', 'El submenu es').not().isEmpty(),
    validarCampos,
  ],
  crearMenu,
)

router.put(
  '/:id',
  [
    validarAdminJWT,
    check('titulo', 'El titulo es obligatorio').not().isEmpty(),
    check('icon', 'El icon es obligatorio').not().isEmpty(),
    check('roles', 'Los roles son obligatorios').not().isEmpty(),
    check('submenu', 'El submenu es').not().isEmpty(),
    validarCampos,
  ],
  actualizarMenu,
)

router.put(
  '/borrarMenu/:id',
  [
    validarAdminJWT,
    check('lastEdited', 'La fecha de edición es obligatoria').not().isEmpty(),
    validarCampos,
  ],
  borrarMenu,
)
router.put(
  '/activarMenu/:id',
  [
    validarAdminJWT,
    check('lastEdited', 'La fecha de edición es obligatoria').not().isEmpty(),
    validarCampos,
  ],
  activarMenu,
)

module.exports = router
