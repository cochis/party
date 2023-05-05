const { response } = require('express')
const bcrypt = require('bcryptjs')
const Usuario = require('../models/usuario')
const { generarJWT } = require('../helpers/jwt')
const { googleVerify } = require('../helpers/google-verify')
const login = async (req, res = response) => {
  const { email, password } = req.body
  try {
    // Verificar email
    const usuarioDB = await Usuario.findOne({ email })
    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: 'Email no encontrado',
      })
    }
    if (!usuarioDB.activated) {
      return res.status(404).json({
        ok: false,
        msg: 'Usuario desactivado',
      })
    }

    // Verificar contraseña
    const validPassword = bcrypt.compareSync(password, usuarioDB.password)
    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: 'Contraseña no válida',
      })
    }

    // Generar el TOKEN - JWT
    const token = await generarJWT(usuarioDB)

    return res.json({
      ok: true,
      token,
      role: usuarioDB.role,
      uid: usuarioDB._id,
    })
  } catch (error) {
    console.log('error', error)
    return res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador',
    })
  }
}

const loginGoogle = async (req, res = response) => {
  try {
    const token = req.body.token
    const { email, name, picture } = await googleVerify(token)

    const usuarioDB = await Usuario.findOne({ email })
    let usuario
    if (!usuarioDB) {
      usuario = new Usuario({
        nombre: name,
        email,
        password: '@@@',
        img: picture,
        google: true,
      })
    } else {
      usuario = usuarioDB
      usuario.google = true
    }
    await usuario.save()

    const tokenR = await generarJWT(usuario)
    return res.status(200).json({
      ok: true,
      msg: 'Loggin google',
      email,
      name,
      picture,
      token: tokenR,
    })
  } catch (error) {
    console.log('error', error)
    return res.status(400).json({
      ok: false,
      msg: 'Loggin de google no es correcto',
    })
  }
}

const renewToken = async (req, res = response) => {
  const uid = req.uid

  // Generar el TOKEN - JWT
  const usuario = await Usuario.findById(uid)
  const token = await generarJWT(usuario)
  res.json({
    ok: true,
    token,
    usuario,
  })
}
module.exports = { login, loginGoogle, renewToken }
