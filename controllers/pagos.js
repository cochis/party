const { response } = require('express')
const bcrypt = require('bcryptjs')
const Pago = require('../models/pago')
const { generarJWT } = require('../helpers/jwt')
//getpagos pago
const getPagos = async (req, res) => {
  const pagos = await Pago.find(
    {},
    'nombre clave img descripcion activated dateCreated lastEdited usuarioCreated ',
  )
  res.json({
    ok: true,
    pagos,
    uid: req.uid,
  })
}

//crearpago pago
const crearPago = async (req, res = response) => {
  const { clave, nombre } = req.body
  const uid = req.uid
  const pago = new Pago({
    usuario: uid,
    ...req.body,
  })

  try {
    const existeClave = await Pago.findOne({ clave })
    if (existeClave) {
      return res.status(400).json({
        ok: false,
        msg: 'El pago ya está registrado',
      })
    }
    await pago.save()
    res.json({
      ok: true,
      pago,
    })
  } catch (error) {
    console.log('error', error)
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado...  revisar logs',
    })
  }
}

//actualizarpago pago
const actualizarPago = async (req, res = response) => {
  //Validar token y comporbar si es el spago

  const uid = req.params.id
  try {
    const pagoDB = await Pago.findById(uid)

    if (!pagoDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No exite un pago',
      })
    }
    const { ...campos } = req.body
    const pagoActualizado = await Pago.findByIdAndUpdate(uid, campos, {
      new: true,
    })
    res.json({
      ok: true,
      pagoActualizado,
    })
  } catch (error) {
    console.log('error', error)
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado',
    })
  }
}
const borrarPago = async (req, res = response) => {
  const uid = req.params.id
  try {
    const pagoDB = await Pago.findById(uid)
    if (!pagoDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No exite un pago',
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
    const pagoActualizado = await Pago.findByIdAndUpdate(uid, campos, {
      new: true,
    })
    res.json({
      ok: true,
      pagoActualizado,
    })
  } catch (error) {
    console.log('error', error)
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador',
    })
  }
}
const activarPago = async (req, res = response) => {
  const uid = req.params.id
  try {
    const pagoDB = await Pago.findById(uid)
    if (!pagoDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No exite un pago',
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
    const pagoActualizado = await Pago.findByIdAndUpdate(uid, campos, {
      new: true,
    })
    res.json({
      ok: true,
      pagoActualizado,
    })
  } catch (error) {
    console.log('error', error)
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador',
    })
  }
}
const getPagoById = async (req, res = response) => {
  const uid = req.params.uid
  try {
    const pagoDB = await Pago.findById(uid)
    if (!pagoDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No exite un catalogo',
      })
    }
    res.json({
      ok: true,
      catalogo: pagoDB,
    })
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado',
    })
  }
}
module.exports = {
  getPagos,
  crearPago,
  actualizarPago,
  borrarPago,
  activarPago,
  getPagoById,
}
