/*
Ruta : api/messages
*/

const { Router } = require('express')
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos')
const {
  getMessages,
  crearMessage,
  actualizarMessage,
  borrarMessage,
  activarMessage,
  getMessageById,
  getAllMessages,
} = require('../controllers/messages')
const { validarJWT } = require('../middlewares/validar-jwt')
const router = Router()

router.get('/', validarJWT, getMessages)
router.get('/all', validarJWT, getAllMessages)
router.get('/:uid', validarJWT, getMessageById)
router.post(
  '/',
  [
    validarJWT,
    check('titulo', 'El titulo es obligatorio').not().isEmpty(),
    check('de', 'Quien lo envia obligatorio').not().isEmpty(),
    check('para', 'El destinatario es obligatorio').not().isEmpty(),
    check('mensaje', 'El mensaje es obligatorio').not().isEmpty(),
    validarCampos,
  ],
  crearMessage,
)

router.put(
  '/:id',
  [
    validarJWT,

    check('lastEdited', 'La fecha de edición es obligatoria').not().isEmpty(),
    validarCampos,
  ],
  actualizarMessage,
)

router.put(
  '/borrarMessage/:id',
  [
    validarJWT,
    check('lastEdited', 'La fecha de edición es obligatoria').not().isEmpty(),
    validarCampos,
  ],
  borrarMessage,
)
router.put(
  '/activarMessage/:id',
  [
    validarJWT,
    check('lastEdited', 'La fecha de edición es obligatoria').not().isEmpty(),
    validarCampos,
  ],
  activarMessage,
)

module.exports = router
