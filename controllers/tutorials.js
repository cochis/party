const { response } = require('express')
const bcrypt = require('bcryptjs')
const Tutorial = require('../models/tutorial')
const { generarJWT } = require('../helpers/jwt')
//getTutorials Tutorial
const getTutorials = async (req, res) => {
  const desde = Number(req.query.desde) || 0
  const cant = Number(req.query.desde) || 10
  const [tutorials, total] = await Promise.all([
    Tutorial.find({})

      .skip(desde)
      .limit(cant),
    Tutorial.countDocuments(),
  ])

  res.json({
    ok: true,
    tutorials,
    uid: req.uid,
    total,
  })
}
const getTutorialsAll = async (req, res) => {
  const [tutorials] = await Promise.all([
    Tutorial.find({}).sort({ dateCreated: -1 }),
  ])

  res.json({
    ok: true,
    tutorials,
    uid: req.uid,
  })
}

//crearTutorial Tutorial
const crearTutorial = async (req, res = response) => {
  const { clave, nombre } = req.body
  const uid = req.uid
  const tutorial = new Tutorial({
    usuarioCreated: uid,
    ...req.body,
  })

  try {
    const existeAno = await Tutorial.findOne({ clave })
    if (existeAno) {
      return res.status(400).json({
        ok: false,
        msg: 'La clave ya está registrada',
      })
    }
    await tutorial.save()
    res.json({
      ok: true,
      tutorial,
    })
  } catch (error) {
    console.log('error', error)
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado...  revisar logs',
    })
  }
}

//actualizarTutorial Tutorial
const actualizarTutorial = async (req, res = response) => {
  //Validar token y comporbar si es el stutorial

  const uid = req.params.id
  try {
    const tutorialDB = await Tutorial.findById(uid)

    if (!tutorialDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No exite un tutorial',
      })
    }
    req.body.usuarioEdited = req.uid
    const tutorialActualizado = await Tutorial.findByIdAndUpdate(
      uid,
      req.body,
      {
        new: true,
      },
    )
    res.json({
      ok: true,
      tutorialActualizado,
    })
  } catch (error) {
    console.log('error', error)
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado',
    })
  }
}
const borrarTutorial = async (req, res = response) => {
  const uid = req.params.id
  try {
    const tutorialDB = await Tutorial.findById(uid)
    if (!tutorialDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No exite un tutorial',
      })
    }
    req.body.usuarioEdited = req.uid
    const {
      clave,
      titulo,
      subtitulo,
      descripcion,
      dirigido,
      cursos,
      ...campos
    } = req.body

    campos.activated = false
    const tutorialActualizado = await Tutorial.findByIdAndUpdate(uid, campos, {
      new: true,
    })
    res.json({
      ok: true,
      tutorialActualizado,
    })
  } catch (error) {
    console.log('error', error)
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador',
    })
  }
}
const activarTutorial = async (req, res = response) => {
  const uid = req.params.id
  try {
    const tutorialDB = await Tutorial.findById(uid)
    if (!tutorialDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No exite un tutorial',
      })
    }
    req.body.usuarioEdited = req.uid
    const {
      nombre,
      clave,
      titulo,
      subtitulo,
      descripcion,
      dirigido,
      cursos,
      ...campos
    } = req.body

    campos.activated = true
    const tutorialActualizado = await Tutorial.findByIdAndUpdate(uid, campos, {
      new: true,
    })
    res.json({
      ok: true,
      tutorialActualizado,
    })
  } catch (error) {
    console.log('error', error)
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador',
    })
  }
}

const getTutorialById = async (req, res = response) => {
  const uid = req.params.uid
  try {
    const tutorialDB = await Tutorial.findById(uid)

    if (!tutorialDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No exite un tutorial',
      })
    }
    res.json({
      ok: true,
      tutorial: tutorialDB,
    })
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado',
    })
  }
}

module.exports = {
  getTutorials,
  crearTutorial,
  actualizarTutorial,
  borrarTutorial,
  activarTutorial,
  getTutorialById,
  getTutorialsAll,
}
