const { response } = require('express')
const bcrypt = require('bcryptjs')
const Ciclo = require('../models/ciclo')
const { generarJWT } = require('../helpers/jwt')
//getCiclos Ciclo
const getCiclos = async (req, res) => {
  const ciclos = await Ciclo.find(
    {},
    'nombre clave img descripcion activated usuario dateCreated lastEditaded usuarioCreated',
  )
  res.json({
    ok: true,
    ciclos,
    uid: req.uid,
  })
}
const getCicloById = async (req, res) => {
  const uid = req.params.uid
  try {
    const cicloDB = await Ciclo.findById(uid)
    if (!cicloDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No exite un ciclo',
      })
    }
    res.json({
      ok: true,
      catalogo: cicloDB,
    })
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado',
    })
  }
}

//crearCiclo Ciclo
const crearCiclo = async (req, res = response) => {
  const { clave, nombre } = req.body
  const uid = req.uid
  const ciclo = new Ciclo({
    usuario: uid,
    ...req.body,
  })

  try {
    const existeAno = await Ciclo.findOne({ clave })
    if (existeAno) {
      return res.status(400).json({
        ok: false,
        msg: 'La clave ya está registrada',
      })
    }
    await ciclo.save()
    res.json({
      ok: true,
      ciclo,
    })
  } catch (error) {
    console.log('error', error)
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado...  revisar logs',
    })
  }
}

//actualizarCiclo Ciclo
const actualizarCiclo = async (req, res = response) => {
  //Validar token y comporbar si es el sciclo

  const uid = req.params.id
  try {
    const cicloDB = await Ciclo.findById(uid)

    if (!cicloDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No exite un ciclo',
      })
    }

    const cicloActualizado = await Ciclo.findByIdAndUpdate(uid, req.body, {
      new: true,
    })
    res.json({
      ok: true,
      cicloActualizado,
    })
  } catch (error) {
    console.log('error', error)
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado',
    })
  }
}
const borrarCiclo = async (req, res = response) => {
  const uid = req.params.id
  try {
    const cicloDB = await Ciclo.findById(uid)
    if (!cicloDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No exite un ciclo',
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
    const cicloActualizado = await Ciclo.findByIdAndUpdate(uid, campos, {
      new: true,
    })
    res.json({
      ok: true,
      cicloActualizado,
    })
  } catch (error) {
    console.log('error', error)
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador',
    })
  }
}
const activarCiclo = async (req, res = response) => {
  const uid = req.params.id
  try {
    const cicloDB = await Ciclo.findById(uid)
    if (!cicloDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No exite un ciclo',
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
    const cicloActualizado = await Ciclo.findByIdAndUpdate(uid, campos, {
      new: true,
    })
    res.json({
      ok: true,
      cicloActualizado,
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
  getCiclos,
  crearCiclo,
  actualizarCiclo,
  borrarCiclo,
  activarCiclo,
  getCicloById,
}
