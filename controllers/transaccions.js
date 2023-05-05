const { response } = require('express')
const bcrypt = require('bcryptjs')
const Transaccion = require('../models/transaccion')
const { generarJWT } = require('../helpers/jwt')
//getTransaccions Transaccion
const getTransaccions = async (req, res) => {
  const transaccions = await Transaccion.find(
    {},
    'folio fechaExpedicion  lugarExpedicion alumno descripcion precio metodoPago activated dateCreated lastEdited uid ',
  )
    .populate('alumno', 'nombre  apellidoPaterno  apellidoMaterno clave uid')
    .sort({ dateCreated: 1 })
  res.json({
    ok: true,
    transaccions,
    uid: req.uid,
  })
}
const getTransaccionById = async (req, res) => {
  const uid = req.params.uid
  try {
    const transaccionDB = await Transaccion.findById(uid).populate('alumno')
    if (!transaccionDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No exite un transaccion',
      })
    }
    res.json({
      ok: true,
      transaccion: transaccionDB,
    })
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado',
    })
  }
}

//crearTransaccion Transaccion
const crearTransaccion = async (req, res = response) => {
  const uid = req.uid
  const transaccion = new Transaccion({
    usuario: uid,
    ...req.body,
  })
  try {
    const count = await Transaccion.count()
    transaccion.folio = count + 1
    await transaccion.save()

    res.json({
      ok: true,
      transaccion,
    })
  } catch (error) {
    console.log('error', error)
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado...  revisar logs',
    })
  }
}

//actualizarTransaccion Transaccion
const actualizarTransaccion = async (req, res = response) => {
  //Validar token y comporbar si es el stransaccion

  const uid = req.params.id
  try {
    const transaccionDB = await Transaccion.findById(uid)

    if (!transaccionDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No exite un transaccion',
      })
    }

    const transaccionActualizado = await Transaccion.findByIdAndUpdate(
      uid,
      req.body,
      {
        new: true,
      },
    )
    res.json({
      ok: true,
      transaccionActualizado,
    })
  } catch (error) {
    console.log('error', error)
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado',
    })
  }
}
const borrarTransaccion = async (req, res = response) => {
  const uid = req.params.id
  try {
    const transaccionDB = await Transaccion.findById(uid)
    if (!transaccionDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No exite un transaccion',
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
    const transaccionActualizado = await Transaccion.findByIdAndUpdate(
      uid,
      campos,
      {
        new: true,
      },
    )
    res.json({
      ok: true,
      transaccionActualizado,
    })
  } catch (error) {
    console.log('error', error)
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador',
    })
  }
}
const activarTransaccion = async (req, res = response) => {
  const uid = req.params.id
  try {
    const transaccionDB = await Transaccion.findById(uid)
    if (!transaccionDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No exite un transaccion',
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
    const transaccionActualizado = await Transaccion.findByIdAndUpdate(
      uid,
      campos,
      {
        new: true,
      },
    )
    res.json({
      ok: true,
      transaccionActualizado,
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
  getTransaccions,
  crearTransaccion,
  actualizarTransaccion,
  borrarTransaccion,
  activarTransaccion,
  getTransaccionById,
}
