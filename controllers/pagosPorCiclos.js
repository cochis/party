const { response } = require('express')
const bcrypt = require('bcryptjs')
const PagoPorCiclo = require('../models/pagosPorCiclo')
const { generarJWT } = require('../helpers/jwt')
//getpagoPorCiclos pagoPorCiclo
const getPagoPorCiclos = async (req, res) => {
  const pagoPorCiclos = await PagoPorCiclo.find({}).populate(
    'ciclo',
    'uid nombre clave',
  )
  res.json({
    ok: true,
    pagoPorCiclos,
    uid: req.uid,
  })
}

//crearpagoPorCiclo pagoPorCiclo
const crearPagoPorCiclo = async (req, res = response) => {
  const { clave, nombre } = req.body
  const uid = req.uid
  const pagoPorCiclo = new PagoPorCiclo({
    usuario: uid,
    ...req.body,
  })

  try {
    const existeClave = await PagoPorCiclo.findOne({ clave })
    if (existeClave) {
      return res.status(400).json({
        ok: false,
        msg: 'El pagoPorCiclo ya está registrado',
      })
    }
    await pagoPorCiclo.save()
    res.json({
      ok: true,
      pagoPorCiclo,
    })
  } catch (error) {
    console.log('error', error)
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado...  revisar logs',
    })
  }
}

//actualizarpagoPorCiclo pagoPorCiclo
const actualizarPagoPorCiclo = async (req, res = response) => {
  //Validar token y comporbar si es el spagoPorCiclo

  const uid = req.params.id
  try {
    const pagoPorCicloDB = await PagoPorCiclo.findById(uid)

    if (!pagoPorCicloDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No exite un pagoPorCiclo',
      })
    }
    const { ...campos } = req.body
    const pagoPorCicloActualizado = await PagoPorCiclo.findByIdAndUpdate(
      uid,
      campos,
      {
        new: true,
      },
    )
    res.json({
      ok: true,
      pagoPorCicloActualizado,
    })
  } catch (error) {
    console.log('error', error)
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado',
    })
  }
}
const borrarPagoPorCiclo = async (req, res = response) => {
  const uid = req.params.id
  try {
    const pagoPorCicloDB = await PagoPorCiclo.findById(uid)
    if (!pagoPorCicloDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No exite un pagoPorCiclo',
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
    const pagoPorCicloActualizado = await PagoPorCiclo.findByIdAndUpdate(
      uid,
      campos,
      {
        new: true,
      },
    )
    res.json({
      ok: true,
      pagoPorCicloActualizado,
    })
  } catch (error) {
    console.log('error', error)
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador',
    })
  }
}
const activarPagoPorCiclo = async (req, res = response) => {
  const uid = req.params.id
  try {
    const pagoPorCicloDB = await PagoPorCiclo.findById(uid)
    if (!pagoPorCicloDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No exite un  pagoPorCiclo',
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
    const pagoPorCicloActualizado = await PagoPorCiclo.findByIdAndUpdate(
      uid,
      campos,
      {
        new: true,
      },
    )
    res.json({
      ok: true,
      pagoPorCicloActualizado,
    })
  } catch (error) {
    console.log('error', error)
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador',
    })
  }
}
const getPagoPorCicloById = async (req, res = response) => {
  const uid = req.params.uid
  try {
    const pagoPorCicloDB = await PagoPorCiclo.findById(uid)
    if (!pagoPorCicloDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No exite un catalogo',
      })
    }
    res.json({
      ok: true,
      catalogo: pagoPorCicloDB,
    })
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado',
    })
  }
}
const getPagoPorCicloByCiclo = async (req, res = response) => {
  const ciclo = req.params.ciclo
  try {
    const querty = { ciclo: ciclo }
    const pagoPorCicloDB = await PagoPorCiclo.findOne(querty)
    if (!pagoPorCicloDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No exite un Pago en ese ciclo',
      })
    }
    res.json({
      ok: true,
      pagosPorCiclo: pagoPorCicloDB,
    })
  } catch (error) {
    console.log('error', error)
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado',
    })
  }
}
module.exports = {
  getPagoPorCiclos,
  crearPagoPorCiclo,
  actualizarPagoPorCiclo,
  borrarPagoPorCiclo,
  activarPagoPorCiclo,
  getPagoPorCicloById,
  getPagoPorCicloByCiclo,
}
