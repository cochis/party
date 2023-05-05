/*
Ruta : api/Padres
*/

const { Router } = require('express')
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos')
const {
  getPadres,
  crearPadre,
  actualizarPadre,
  borrarPadre,
  activarPadre,
  getPadreById,
} = require('../controllers/padres')
const { validarAdminJWT } = require('../middlewares/validar-jwt')
const router = Router()

router.get('/', validarAdminJWT, getPadres)
router.get('/:id', validarAdminJWT, getPadreById)
router.post(
  '/',
  [
    validarAdminJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('hijo', 'El hijo es obligatorio').not().isEmpty(),
    check('nacionalidad', 'La nacionalidad es obligatoria').not().isEmpty(),
    check('curp', 'El curp es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').not().isEmpty(),
    check('ocupacion', 'La ocupacion es obligatoria').not().isEmpty(),
    check('gradoMaximoEstudios', 'El grado Maximo Estudios es obligatorio')
      .not()
      .isEmpty(),
    check('estadoCivil', 'El estado civil es obligatorio').not().isEmpty(),
    check('calle', 'La calle es obligatoria').not().isEmpty(),
    check('numeroExterior', 'El numero exterior es obligatorio')
      .not()
      .isEmpty(),

    check('colonia', 'la colonia es obligatoria').not().isEmpty(),
    check('codigoPostal', 'El codigo postal es obligatorio').not().isEmpty(),
    check('entreCalles', 'Las entre calles son obligatorias').not().isEmpty(),
    check('parentesco', 'El parentesco tiene que se valido').isMongoId(),
    validarCampos,
  ],
  crearPadre,
)

router.put(
  '/:id',
  [
    validarAdminJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('hijo', 'El hijo es obligatorio').not().isEmpty(),
    check('nacionalidad', 'La nacionalidad es obligatoria').not().isEmpty(),
    check('curp', 'El curp es obligatorio').not().isEmpty(),

    check('email', 'El email es obligatorio').not().isEmpty(),
    check('ocupacion', 'La ocupacion es obligatoria').not().isEmpty(),
    check('gradoMaximoEstudios', 'El grado Maximo Estudios es obligatorio')
      .not()
      .isEmpty(),
    check('estadoCivil', 'El estado civil es obligatorio').not().isEmpty(),
    check('calle', 'La calle es obligatoria').not().isEmpty(),
    check('numeroExterior', 'El numero exterior es obligatorio')
      .not()
      .isEmpty(),
    check('numeroInterior', 'El numero interior es obligatorio.')
      .not()
      .isEmpty(),
    check('colonia', 'la colonia es obligatoria').not().isEmpty(),
    check('codigoPostal', 'El codigo postal es obligatorio').not().isEmpty(),
    check('entreCalles', 'Las entre calles son obligatorias').not().isEmpty(),
    check('parentesco', 'El parentesco tiene que se valido').isMongoId(),
    check('lastEdited', 'La fecha de edición es obligatoria').not().isEmpty(),
    validarCampos,
  ],
  actualizarPadre,
)

router.put(
  '/borrarPadre/:id',
  [
    validarAdminJWT,
    check('lastEdited', 'La fecha de edición es obligatoria').not().isEmpty(),
    validarCampos,
  ],
  borrarPadre,
)
router.put(
  '/activarPadre/:id',
  [
    validarAdminJWT,
    check('lastEdited', 'La fecha de edición es obligatoria').not().isEmpty(),
    validarCampos,
  ],
  activarPadre,
)

module.exports = router
