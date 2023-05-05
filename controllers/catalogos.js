const { response } = require('express')
const bcrypt = require('bcryptjs')
const Catalogo = require('../models/catalogo')
const { generarJWT } = require('../helpers/jwt')
//getCatalogos Catalogo
const getCatalogos = async (req, res) => {
  const catalogos = await Catalogo.find(
    {},
    'tipo nombre clave img descripcion activated usuario dateCreated lastEditaded usuarioCreated',
  )
  res.json({
    ok: true,
    catalogos,
    uid: req.uid,
  })
}
const getCatalogoByTipo = async (req, res) => {
  const tipo = req.params.tipo
  const regex = new RegExp(tipo, 'i')
  try {
    const catalogoDB = await Catalogo.find({ tipo: regex })
    if (!catalogoDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No exite un catalogo',
      })
    }
    res.json({
      ok: true,
      catalogo: catalogoDB,
    })
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado',
    })
  }
}
const getCatalogoById = async (req, res) => {
  const uid = req.params.uid
  try {
    const catalogoDB = await Catalogo.findById(uid)
    if (!catalogoDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No exite un catalogo',
      })
    }
    res.json({
      ok: true,
      catalogo: catalogoDB,
    })
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado',
    })
  }
}

//crearCatalogo Catalogo
const crearCatalogo = async (req, res = response) => {
  const { clave, nombre } = req.body
  const uid = req.uid
  const catalogo = new Catalogo({
    usuario: uid,
    ...req.body,
  })

  try {
    const existeAno = await Catalogo.findOne({ clave })
    if (existeAno) {
      return res.status(400).json({
        ok: false,
        msg: 'La clave ya está registrada',
      })
    }
    await catalogo.save()
    res.json({
      ok: true,
      catalogo,
    })
  } catch (error) {
    console.log('error', error)
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado...  revisar logs',
    })
  }
}

//actualizarCatalogo Catalogo
const actualizarCatalogo = async (req, res = response) => {
  //Validar token y comporbar si es el scatalogo

  const uid = req.params.id
  try {
    const catalogoDB = await Catalogo.findById(uid)

    if (!catalogoDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No exite un catalogo',
      })
    }

    const catalogoActualizado = await Catalogo.findByIdAndUpdate(
      uid,
      req.body,
      {
        new: true,
      },
    )
    res.json({
      ok: true,
      catalogoActualizado,
    })
  } catch (error) {
    console.log('error', error)
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado',
    })
  }
}
const borrarCatalogo = async (req, res = response) => {
  const uid = req.params.id
  try {
    const catalogoDB = await Catalogo.findById(uid)
    if (!catalogoDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No exite un catalogo',
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
    const catalogoActualizado = await Catalogo.findByIdAndUpdate(uid, campos, {
      new: true,
    })
    res.json({
      ok: true,
      catalogoActualizado,
    })
  } catch (error) {
    console.log('error', error)
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador',
    })
  }
}
const activarCatalogo = async (req, res = response) => {
  const uid = req.params.id
  try {
    const catalogoDB = await Catalogo.findById(uid)
    if (!catalogoDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No exite un catalogo',
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
    const catalogoActualizado = await Catalogo.findByIdAndUpdate(uid, campos, {
      new: true,
    })
    res.json({
      ok: true,
      catalogoActualizado,
    })
  } catch (error) {
    console.log('error', error)
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador',
    })
  }
}

module.exports = {
  getCatalogos,
  crearCatalogo,
  actualizarCatalogo,
  borrarCatalogo,
  activarCatalogo,
  getCatalogoById,
  getCatalogoByTipo,
}
