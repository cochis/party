const { response } = require('express')
const bcrypt = require('bcryptjs')
const Curso = require('../models/curso')
const { generarJWT } = require('../helpers/jwt')
//getCursos Curso
const getCursos = async (req, res) => {
  const desde = Number(req.query.desde) || 0
  const cant = Number(req.query.desde) || 10
  const [cursos, total] = await Promise.all([
    Curso.find(
      {},
      'nombre clave ciclo grado grupo alumnos maestros activated dateCreated lastEdited usuarioCreated  uid',
    )
      .populate(
        'maestros',
        'nombre apellidoPaterno apellidoMaterno clave sexo fechaNacimiento curp nacionalidad entidadNacimiento peso estatura tipoSanguineo telefonoCasa telefonoCelular email gradoMaximoEstudios estadoCivil calle numeroExterior numeroInterior colonia codigoPostal estado municipio entreCalles materias grados img documentosEntregados currentCursos currentGrados notas activated dateCreated lastEdited usuarioCreated uid',
      )
      .populate(
        'alumnos',
        'nombre apellidoPaterno apellidoMaterno clave sexo fechaNacimento curp nacionalidad entidadNacimiento peso estatura tipoSanguineo telefono calle numeroExterior numeroInterior colonia codigoPostal estado municipio grado documentosEntregados padres currentCurso notas usuarioCreated usuario activated dateCreated lastEdited uid',
      )
      .populate('grado', 'nombre clave descripcion uid')
      .populate('ciclo', 'nombre clave descripcion uid')
      .skip(desde)
      .limit(cant),
    Curso.countDocuments(),
  ])

  res.json({
    ok: true,
    cursos,
    uid: req.uid,
    total,
  })
}
const getCursosAll = async (req, res) => {
  const [cursos] = await Promise.all([
    Curso.find({})
      .populate(
        'maestros',
        'nombre apellidoPaterno apellidoMaterno clave sexo fechaNacimiento curp nacionalidad entidadNacimiento peso estatura tipoSanguineo telefonoCasa telefonoCelular email gradoMaximoEstudios estadoCivil calle numeroExterior numeroInterior colonia codigoPostal estado municipio entreCalles materias grados img documentosEntregados currentCursos currentGrados notas activated dateCreated lastEdited usuarioCreated uid',
      )
      .populate(
        'alumnos',
        'nombre apellidoPaterno apellidoMaterno clave sexo fechaNacimento curp nacionalidad entidadNacimiento peso estatura tipoSanguineo telefono calle numeroExterior numeroInterior colonia codigoPostal estado municipio grado documentosEntregados padres currentCurso notas usuarioCreated usuario activated dateCreated lastEdited uid',
      )
      .populate('grado', 'nombre clave descripcion uid')
      .populate('ciclo', 'nombre clave descripcion uid'),
  ])

  res.json({
    ok: true,
    cursos,
    uid: req.uid,
  })
}

//crearCurso Curso
const crearCurso = async (req, res = response) => {
  const { clave, nombre } = req.body
  const uid = req.uid
  const curso = new Curso({
    usuario: uid,
    ...req.body,
  })

  try {
    const existeAno = await Curso.findOne({ clave })
    if (existeAno) {
      return res.status(400).json({
        ok: false,
        msg: 'La clave ya está registrada',
      })
    }
    await curso.save()
    res.json({
      ok: true,
      curso,
    })
  } catch (error) {
    console.log('error', error)
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado...  revisar logs',
    })
  }
}

//actualizarCurso Curso
const actualizarCurso = async (req, res = response) => {
  //Validar token y comporbar si es el scurso

  const uid = req.params.id
  try {
    const cursoDB = await Curso.findById(uid)

    if (!cursoDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No exite un curso',
      })
    }

    const cursoActualizado = await Curso.findByIdAndUpdate(uid, req.body, {
      new: true,
    })
    res.json({
      ok: true,
      cursoActualizado,
    })
  } catch (error) {
    console.log('error', error)
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado',
    })
  }
}
const borrarCurso = async (req, res = response) => {
  const uid = req.params.id
  try {
    const cursoDB = await Curso.findById(uid)
    if (!cursoDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No exite un curso',
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
    const cursoActualizado = await Curso.findByIdAndUpdate(uid, campos, {
      new: true,
    })
    res.json({
      ok: true,
      cursoActualizado,
    })
  } catch (error) {
    console.log('error', error)
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador',
    })
  }
}
const activarCurso = async (req, res = response) => {
  const uid = req.params.id
  try {
    const cursoDB = await Curso.findById(uid)
    if (!cursoDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No exite un curso',
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
    const cursoActualizado = await Curso.findByIdAndUpdate(uid, campos, {
      new: true,
    })
    res.json({
      ok: true,
      cursoActualizado,
    })
  } catch (error) {
    console.log('error', error)
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador',
    })
  }
}

const getCursoById = async (req, res = response) => {
  const uid = req.params.uid
  try {
    const cursoDB = await Curso.findById(
      uid,
      'nombre clave ciclo grado grupo alumnos maestros activated dateCreated lastEdited usuarioCreated  uid',
    )
      .populate(
        'maestros',
        'nombre apellidoPaterno apellidoMaterno clave sexo fechaNacimiento curp nacionalidad entidadNacimiento peso estatura tipoSanguineo telefonoCasa telefonoCelular email gradoMaximoEstudios estadoCivil calle numeroExterior numeroInterior colonia codigoPostal estado municipio entreCalles materias grados img documentosEntregados currentCursos currentGrados notas activated dateCreated lastEdited usuarioCreated uid',
      )
      .populate(
        'alumnos',
        'nombre apellidoPaterno apellidoMaterno clave sexo fechaNacimento curp nacionalidad entidadNacimiento peso estatura tipoSanguineo telefono calle numeroExterior numeroInterior colonia codigoPostal estado municipio grado documentosEntregados padres currentCurso notas usuarioCreated usuario activated dateCreated lastEdited uid',
      )
      .populate('grado', 'nombre clave descripcion uid')
      .populate('alumnos', 'nombre apellidoPaterno apellidoMaterno uid')
      .populate('ciclo', 'nombre clave descripcion uid')

    if (!cursoDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No exite un curso',
      })
    }
    res.json({
      ok: true,
      curso: cursoDB,
    })
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado',
    })
  }
}

module.exports = {
  getCursos,
  crearCurso,
  actualizarCurso,
  borrarCurso,
  activarCurso,
  getCursoById,
  getCursosAll,
}
