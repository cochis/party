const { response } = require('express')
const bcrypt = require('bcryptjs')
const TipoSanguineo = require('../models/tipoSanguineo')
const { generarJWT } = require('../helpers/jwt')
//getTipoSanguineos TipoSanguineo
const getTipoSanguineos = async (req, res) => {
  const tipoSanguineos = await TipoSanguineo.find(
    {},
    'nombre clave img descripcion activated dateCreated lastEdited usuarioCreated ',
  )
  res.json({
    ok: true,
    tipoSanguineos,
    uid: req.uid,
  })
}

//crearTipoSanguineo TipoSanguineo
const crearTipoSanguineo = async (req, res = response) => {
  const { clave, nombre } = req.body
  const uid = req.uid
  const tipoSanguineo = new TipoSanguineo({
    usuario: uid,
    ...req.body,
  })

  try {
    const existeClave = await TipoSanguineo.findOne({ clave })
    if (existeClave) {
      return res.status(400).json({
        ok: false,
        msg: 'El tipoSanguineo ya está registrado',
      })
    }
    await tipoSanguineo.save()
    res.json({
      ok: true,
      tipoSanguineo,
    })
  } catch (error) {
    console.log('error', error)
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado...  revisar logs',
    })
  }
}

//actualizarTipoSanguineo TipoSanguineo
const actualizarTipoSanguineo = async (req, res = response) => {
  //Validar token y comporbar si es el stipoSanguineo

  const uid = req.params.id
  try {
    const tipoSanguineoDB = await TipoSanguineo.findById(uid)

    if (!tipoSanguineoDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No exite un tipoSanguineo',
      })
    }
    const { ...campos } = req.body
    const tipoSanguineoActualizado = await TipoSanguineo.findByIdAndUpdate(
      uid,
      campos,
      {
        new: true,
      },
    )
    res.json({
      ok: true,
      tipoSanguineoActualizado,
    })
  } catch (error) {
    console.log('error', error)
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado',
    })
  }
}
const borrarTipoSanguineo = async (req, res = response) => {
  const uid = req.params.id
  try {
    const tipoSanguineoDB = await TipoSanguineo.findById(uid)
    if (!tipoSanguineoDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No exite un tipoSanguineo',
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
    const tipoSanguineoActualizado = await TipoSanguineo.findByIdAndUpdate(
      uid,
      campos,
      {
        new: true,
      },
    )
    res.json({
      ok: true,
      tipoSanguineoActualizado,
    })
  } catch (error) {
    console.log('error', error)
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador',
    })
  }
}
const activarTipoSanguineo = async (req, res = response) => {
  const uid = req.params.id
  try {
    const tipoSanguineoDB = await TipoSanguineo.findById(uid)
    if (!tipoSanguineoDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No exite un tipoSanguineo',
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
    const tipoSanguineoActualizado = await TipoSanguineo.findByIdAndUpdate(
      uid,
      campos,
      {
        new: true,
      },
    )
    res.json({
      ok: true,
      tipoSanguineoActualizado,
    })
  } catch (error) {
    console.log('error', error)
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador',
    })
  }
}
const getTipoSanguineoById = async (req, res = response) => {
  const uid = req.params.uid
  try {
    const tipoSanguineoDB = await TipoSanguineo.findById(uid)
    if (!tipoSanguineoDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No exite un catalogo',
      })
    }
    res.json({
      ok: true,
      catalogo: tipoSanguineoDB,
    })
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado',
    })
  }
}
module.exports = {
  getTipoSanguineos,
  crearTipoSanguineo,
  actualizarTipoSanguineo,
  borrarTipoSanguineo,
  activarTipoSanguineo,
  getTipoSanguineoById,
}
