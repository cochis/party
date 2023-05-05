const { response } = require('express')
const bcrypt = require('bcryptjs')
const Message = require('../models/message')
const { generarJWT } = require('../helpers/jwt')
//getMessages Message
const getMessages = async (req, res) => {
  const messages = await Message.find(
    {},
    'titulo de para mensaje file activated dateCreated lastEdited usuarioCreated ',
  )
    .populate('de', 'nombre uid')
    .populate('para', 'nombre uid ')
  res.json({
    ok: true,
    messages,
    uid: req.uid,
  })
}

//crearMessage Message
const crearMessage = async (req, res = response) => {
  const { clave, nombre } = req.body
  const uid = req.uid
  const message = new Message({
    de: uid,

    ...req.body,
  })

  try {
    await message.save()
    res.json({
      ok: true,
      message,
    })
  } catch (error) {
    console.log('error', error)
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado...  revisar logs',
    })
  }
}

//actualizarMessage Message
const actualizarMessage = async (req, res = response) => {
  //Validar token y comporbar si es el smessage

  const uid = req.params.id
  try {
    const messageDB = await Message.findById(uid)

    if (!messageDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No exite un message',
      })
    }

    const messageActualizado = await Message.findByIdAndUpdate(uid, req.body, {
      new: true,
    })
    res.json({
      ok: true,
      messageActualizado,
    })
  } catch (error) {
    console.log('error', error)
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado',
    })
  }
}
const borrarMessage = async (req, res = response) => {
  const uid = req.params.id
  try {
    const messageDB = await Message.findById(uid)
    if (!messageDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No exite un message',
      })
    }

    const {
      nombre,
      apellidoPaterno,
      apellidoMaterno,
      email,
      password,
      img,
      role,
      google,
      ...campos
    } = req.body

    campos.activated = false
    const messageActualizado = await Message.findByIdAndUpdate(uid, campos, {
      new: true,
    })
    res.json({
      ok: true,
      messageActualizado,
    })
  } catch (error) {
    console.log('error', error)
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador',
    })
  }
}
const activarMessage = async (req, res = response) => {
  const uid = req.params.id
  try {
    const messageDB = await Message.findById(uid)
    if (!messageDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No exite un message',
      })
    }

    const {
      nombre,
      apellidoPaterno,
      apellidoMaterno,
      email,
      password,
      img,
      role,
      google,
      ...campos
    } = req.body

    campos.activated = true
    const messageActualizado = await Message.findByIdAndUpdate(uid, campos, {
      new: true,
    })
    res.json({
      ok: true,
      messageActualizado,
    })
  } catch (error) {
    console.log('error', error)
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador',
    })
  }
}
const getMessageById = async (req, res = response) => {
  const uid = req.params.uid
  try {
    const messageDB = await Message.findById(uid)
    if (!messageDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No exite un message',
      })
    }
    res.json({
      ok: true,
      message: messageDB,
    })
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado',
    })
  }
}
const getMessageByUser = async (req, res = response) => {
  const uid = req.params.uid
  try {
    const messageDB = await Message.find(
      { de: uid },
      'titulo de para mensaje file activated dateCreated lastEdited usuarioCreated ',
    )
      .populate(
        'de',
        'nombre email activated dateCreated lastEdited img google password usuarioCreated apellidoPaterno apellidoMaterno role uid ',
      )
      .populate('para', 'nombre uid ')

    if (!messageDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No exite un message',
      })
    }
    res.json({
      ok: true,
      message: messageDB,
    })
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado',
    })
  }
}

const getAllMessages = async (req, res) => {
  const [messages, total] = await Promise.all([
    Message.find(
      {},
      'titulo de para curso ciclo mensaje file activated dateCreated lastEdited usuarioCreated ',
    )
      .populate(
        'de',
        'nombre email activated dateCreated lastEdited img google password usuarioCreated apellidoPaterno apellidoMaterno role uid ',
      )
      .populate('para', 'nombre apellidoPaterno  apellidoMaterno uid usuario ')
      .populate('ciclo', 'nombre clave  activated uid  ')
      .sort({ dateCreated: -1 }),
    Message.countDocuments(),
  ])

  res.json({
    ok: true,
    messages,
    uid: req.uid,
    total,
  })
}

module.exports = {
  getMessages,
  crearMessage,
  actualizarMessage,
  borrarMessage,
  activarMessage,
  getMessageById,
  getAllMessages,
}
