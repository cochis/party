const { response } = require('express')
const bcrypt = require('bcryptjs')
const Grado = require('../models/grado')
const { generarJWT } = require('../helpers/jwt')
//getGrados Grado
const getGrados = async (req, res) => {
  const grados = await Grado.find(
    {},
    'nombre clave img descripcion activated dateCreated lastEdited usuarioCreated ',
  )
  res.json({
    ok: true,
    grados,
    uid: req.uid,
  })
}

//crearGrado Grado
const crearGrado = async (req, res = response) => {
  const { clave, nombre } = req.body
  const uid = req.uid
  const grado = new Grado({
    usuario: uid,
    ...req.body,
  })

  try {
    const existeClave = await Grado.findOne({ clave })
    if (existeClave) {
      return res.status(400).json({
        ok: false,
        msg: 'El grado ya está registrado',
      })
    }
    await grado.save()
    res.json({
      ok: true,
      grado,
    })
  } catch (error) {
    console.log('error', error)
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado...  revisar logs',
    })
  }
}

//actualizarGrado Grado
const actualizarGrado = async (req, res = response) => {
  //Validar token y comporbar si es el sgrado

  const uid = req.params.id
  try {
    const gradoDB = await Grado.findById(uid)

    if (!gradoDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No exite un grado',
      })
    }
    const { ...campos } = req.body
    const gradoActualizado = await Grado.findByIdAndUpdate(uid, campos, {
      new: true,
    })
    res.json({
      ok: true,
      gradoActualizado,
    })
  } catch (error) {
    console.log('error', error)
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado',
    })
  }
}
const borrarGrado = async (req, res = response) => {
  const uid = req.params.id
  try {
    const gradoDB = await Grado.findById(uid)
    if (!gradoDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No exite un grado',
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
    const gradoActualizado = await Grado.findByIdAndUpdate(uid, campos, {
      new: true,
    })
    res.json({
      ok: true,
      gradoActualizado,
    })
  } catch (error) {
    console.log('error', error)
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador',
    })
  }
}
const activarGrado = async (req, res = response) => {
  const uid = req.params.id
  try {
    const gradoDB = await Grado.findById(uid)
    if (!gradoDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No exite un grado',
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
    const gradoActualizado = await Grado.findByIdAndUpdate(uid, campos, {
      new: true,
    })
    res.json({
      ok: true,
      gradoActualizado,
    })
  } catch (error) {
    console.log('error', error)
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador',
    })
  }
}
const getGradosById = async (req, res = response) => {
  const uid = req.params.uid
  try {
    const gradoDB = await Grado.findById(uid)
    if (!gradoDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No exite un catalogo',
      })
    }
    res.json({
      ok: true,
      catalogo: gradoDB,
    })
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado',
    })
  }
}

module.exports = {
  getGrados,
  crearGrado,
  actualizarGrado,
  borrarGrado,
  activarGrado,
  getGradosById,
}
