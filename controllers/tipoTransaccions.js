const { response } = require('express')
const bcrypt = require('bcryptjs')
const TipoTransaccion = require('../models/tipoTransaccion')
const { generarJWT } = require('../helpers/jwt')
//getTipoTransaccions TipoTransaccion
const getTipoTransaccions = async (req, res) => {
  const tipoTransaccions = await TipoTransaccion.find(
    {},
    'nombre clave img descripcion activated dateCreated lastEdited usuarioCreated ',
  )
  res.json({
    ok: true,
    tipoTransaccions,
    uid: req.uid,
  })
}

//crearTipoTransaccion TipoTransaccion
const crearTipoTransaccion = async (req, res = response) => {
  const { clave, nombre } = req.body
  const uid = req.uid
  const tipoTransaccion = new TipoTransaccion({
    usuario: uid,
    ...req.body,
  })

  try {
    const existeClave = await TipoTransaccion.findOne({ clave })
    if (existeClave) {
      return res.status(400).json({
        ok: false,
        msg: 'El tipoTransaccion  ya está registrado',
      })
    }
    await tipoTransaccion.save()
    res.json({
      ok: true,
      tipoTransaccion,
    })
  } catch (error) {
    console.log('error', error)
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado...  revisar logs',
    })
  }
}

//actualizarTipoTransaccion TipoTransaccion
const actualizarTipoTransaccion = async (req, res = response) => {
  //Validar token y comporbar si es el stipoTransaccion

  const uid = req.params.id
  try {
    const tipoTransaccionDB = await TipoTransaccion.findById(uid)

    if (!tipoTransaccionDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No exite un tipoTransaccion',
      })
    }
    const { ...campos } = req.body
    const tipoTransaccionActualizado = await TipoTransaccion.findByIdAndUpdate(
      uid,
      campos,
      {
        new: true,
      },
    )
    res.json({
      ok: true,
      tipoTransaccionActualizado,
    })
  } catch (error) {
    console.log('error', error)
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado',
    })
  }
}
const borrarTipoTransaccion = async (req, res = response) => {
  const uid = req.params.id
  try {
    const tipoTransaccionDB = await TipoTransaccion.findById(uid)
    if (!tipoTransaccionDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No exite un tipoTransaccion',
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
    const tipoTransaccionActualizado = await TipoTransaccion.findByIdAndUpdate(
      uid,
      campos,
      {
        new: true,
      },
    )
    res.json({
      ok: true,
      tipoTransaccionActualizado,
    })
  } catch (error) {
    console.log('error', error)
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador',
    })
  }
}
const activarTipoTransaccion = async (req, res = response) => {
  const uid = req.params.id
  try {
    const tipoTransaccionDB = await TipoTransaccion.findById(uid)
    if (!tipoTransaccionDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No exite un tipoTransaccion',
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
    const tipoTransaccionActualizado = await TipoTransaccion.findByIdAndUpdate(
      uid,
      campos,
      {
        new: true,
      },
    )
    res.json({
      ok: true,
      tipoTransaccionActualizado,
    })
  } catch (error) {
    console.log('error', error)
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador',
    })
  }
}
const getTipoTransaccionsById = async (req, res = response) => {
  const uid = req.params.uid
  try {
    const tipoTransaccionDB = await TipoTransaccion.findById(uid)
    if (!tipoTransaccionDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No exite un catalogo',
      })
    }
    res.json({
      ok: true,
      catalogo: tipoTransaccionDB,
    })
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado',
    })
  }
}

module.exports = {
  getTipoTransaccions,
  crearTipoTransaccion,
  actualizarTipoTransaccion,
  borrarTipoTransaccion,
  activarTipoTransaccion,
  getTipoTransaccionsById,
}
