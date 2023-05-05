const { response } = require('express')
const bcrypt = require('bcryptjs')
const Materia = require('../models/materia')
const { generarJWT } = require('../helpers/jwt')
//getMaterias Materia
const getMaterias = async (req, res) => {
  const materias = await Materia.find(
    {},
    'nombre clave img descripcion activated usuario dateCreated lastEditaded usuarioCreated',
  )
  res.json({
    ok: true,
    materias,
    uid: req.uid,
  })
}

const getMateriaById = async (req, res) => {
  const uid = req.params.uid
  try {
    const materiaDB = await Materia.findById(uid)
    if (!materiaDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No exite un ciclo',
      })
    }
    res.json({
      ok: true,
      catalogo: materiaDB,
    })
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado',
    })
  }
}

//crearMateria Materia
const crearMateria = async (req, res = response) => {
  const { clave, nombre } = req.body
  const uid = req.uid
  const materia = new Materia({
    usuario: uid,
    ...req.body,
  })

  try {
    const existeAno = await Materia.findOne({ clave })
    if (existeAno) {
      return res.status(400).json({
        ok: false,
        msg: 'La clave ya está registrada',
      })
    }
    await materia.save()
    res.json({
      ok: true,
      materia,
    })
  } catch (error) {
    console.log('error', error)
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado...  revisar logs',
    })
  }
}

//actualizarMateria Materia
const actualizarMateria = async (req, res = response) => {
  //Validar token y comporbar si es el smateria

  const uid = req.params.id
  try {
    const materiaDB = await Materia.findById(uid)

    if (!materiaDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No exite un materia',
      })
    }

    const materiaActualizado = await Materia.findByIdAndUpdate(uid, req.body, {
      new: true,
    })
    res.json({
      ok: true,
      materiaActualizado,
    })
  } catch (error) {
    console.log('error', error)
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado',
    })
  }
}
const borrarMateria = async (req, res = response) => {
  const uid = req.params.id
  try {
    const materiaDB = await Materia.findById(uid)
    if (!materiaDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No exite un materia',
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
    const materiaActualizado = await Materia.findByIdAndUpdate(uid, campos, {
      new: true,
    })
    res.json({
      ok: true,
      materiaActualizado,
    })
  } catch (error) {
    console.log('error', error)
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador',
    })
  }
}
const activarMateria = async (req, res = response) => {
  const uid = req.params.id
  try {
    const materiaDB = await Materia.findById(uid)
    if (!materiaDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No exite un materia',
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
    const materiaActualizado = await Materia.findByIdAndUpdate(uid, campos, {
      new: true,
    })
    res.json({
      ok: true,
      materiaActualizado,
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
  getMaterias,
  crearMateria,
  actualizarMateria,
  borrarMateria,
  activarMateria,
  getMateriaById,
}
