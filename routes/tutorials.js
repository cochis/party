/*
Ruta : api/tutorials
*/

const { Router } = require('express')
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos')
const {
  getTutorials,
  crearTutorial,
  actualizarTutorial,
  borrarTutorial,
  activarTutorial,
  getTutorialById,
  getTutorialsAll,
} = require('../controllers/tutorials')
const { validarAdminJWT } = require('../middlewares/validar-jwt')
const router = Router()

router.get('/', validarAdminJWT, getTutorials)
router.get('/all', validarAdminJWT, getTutorialsAll)
router.get('/:uid', validarAdminJWT, getTutorialById)
router.post(
  '/',
  [
    validarAdminJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('clave', 'La clave es obligatoria').not().isEmpty(),
    check('titulo', 'El titulo es obligatorio').not().isEmpty(),
    check('subtitulo', 'El subtitulo es obligatorio').not().isEmpty(),
    check('descripcion', 'La descripcion es obligatoria').not().isEmpty(),
    validarCampos,
  ],
  crearTutorial,
)

router.put(
  '/:id',
  [
    validarAdminJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('clave', 'La clave es obligatoria').not().isEmpty(),
    check('titulo', 'El titulo es obligatorio').not().isEmpty(),
    check('subtitulo', 'El subtitulo es obligatorio').not().isEmpty(),
    check('descripcion', 'La descripcion es obligatoria').not().isEmpty(),
    validarCampos,
  ],
  actualizarTutorial,
)

router.put(
  '/borrarTutorial/:id',
  [
    validarAdminJWT,
    check('lastEdited', 'La fecha de edición es obligatoria').not().isEmpty(),
    validarCampos,
  ],
  borrarTutorial,
)
router.put(
  '/activarTutorial/:id',
  [
    validarAdminJWT,
    check('lastEdited', 'La fecha de edición es obligatoria').not().isEmpty(),
    validarCampos,
  ],
  activarTutorial,
)

module.exports = router
