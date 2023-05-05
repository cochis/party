const { response } = require('express')
const bcrypt = require('bcryptjs')
const Alumno = require('../models/alumno')
const Usuario = require('../models/usuario')
const { generarJWT } = require('../helpers/jwt')
//getAlumnos Alumno
const getAlumnos = async (req, res) => {
  const desde = Number(req.query.desde) || 0
  const cant = Number(req.query.cant) || 10

  const [alumnos, total] = await Promise.all([
    Alumno.find(
      {},
      'nombre apellidoPaterno apellidoMaterno clave claveCheck sexo fechaNacimiento curp nacionalidad entidadNacimiento peso estatura tipoSanguineo telefono calle numeroExterior numeroInterior colonia codigoPostal estado municipio grado documentosEntregados padres currentCurso notas usuarioCreated usuario activated dateCreated lastEdited uid img',
    )
      .populate('usuarioCreated', 'nombre uid')
      .populate('sexo', 'nombre clave uid')
      .populate('currentCurso', 'nombre clave uid')
      .populate('tipoSanguineo', 'nombre clave uid')
      .populate('padres', 'nombre  uid')
      .populate('usuario', 'nombre email uid')
      .skip(desde)
      .limit(cant),
    Alumno.countDocuments(),
  ])

  res.json({
    ok: true,
    alumnos,
    uid: req.uid,
    total,
  })
}
const getAlumnosAll = async (req, res) => {
  const [alumnos, total] = await Promise.all([
    Alumno.find(
      {},
      'nombre apellidoPaterno apellidoMaterno clave claveCheck sexo fechaNacimiento curp nacionalidad entidadNacimiento peso estatura tipoSanguineo telefono calle numeroExterior numeroInterior colonia codigoPostal estado municipio grado documentosEntregados padres currentCurso notas usuarioCreated usuario activated dateCreated lastEdited uid img ',
    )
      .sort({ currentCurso: 1 })
      .populate('usuarioCreated', 'nombre uid')
      .populate('sexo', 'nombre clave uid ')
      .populate('currentCurso', 'nombre clave uid activated')
      .populate('tipoSanguineo', 'nombre clave uid activated')
      .populate('padres', 'nombre  uid activated')
      .populate('usuario', 'nombre email uid activated'),
  ])

  res.json({
    ok: true,
    alumnos,
    uid: req.uid,
    total,
  })
}

const getMyAlumno = async (req, res) => {
  const uid = req.params.uid
  try {
    const alumnoDB = await Alumno.find(
      { usuario: uid },
      'nombre apellidoPaterno apellidoMaterno clave claveCheck sexo fechaNacimiento curp nacionalidad entidadNacimiento peso estatura tipoSanguineo telefono calle numeroExterior numeroInterior colonia codigoPostal estado municipio grado documentosEntregados padres currentCurso notas usuarioCreated usuario activated dateCreated lastEdited uid img ',
    )
      .populate('usuarioCreated', 'nombre uid')
      .populate(
        'currentCurso',
        'nombre clave ciclo grado grupo alumnos maestros activated dateCreated lastEdited usuarioCreated uid ',
      )
      .populate(
        'documentosEntregados',
        'nombre clave activated dateCreated lastEdited descripcion uid  ',
      )
      .populate(
        'padres',
        'titular recoger nombre fechaNacimiento img nacionalidad curp telefonoCelular telefonoCasa email redSocial ocupacion  gradoMaximoEstudios estadoCivil calle numeroExterior numeroInterior colonia municipio estado codigoPostal entreCalles parentesco notas activated',
      )
      .populate(
        'usuario',
        'nombre clave activated dateCreated lastEdited descripcion uid ',
      )
    if (!alumnoDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No exite un alumno',
      })
    }
    res.json({
      ok: true,
      alumno: alumnoDB,
    })
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado',
    })
  }
}
const getAlumnoById = async (req, res) => {
  const uid = req.params.uid
  try {
    const alumnoDB = await Alumno.findById(uid)
      .populate('usuarioCreated', 'nombre uid')
      .populate(
        'currentCurso',
        'nombre clave ciclo grado grupo alumnos maestros activated dateCreated lastEdited usuarioCreated uid ',
      )
      .populate(
        'padres',
        'titular recoger nombre fechaNacimiento img nacionalidad curp telefonoCelular telefonoCasa email redSocial ocupacion  gradoMaximoEstudios estadoCivil calle numeroExterior numeroInterior colonia municipio estado codigoPostal entreCalles parentesco notas activated',
      )
      .populate('usuario', 'nombre email uid')
    if (!alumnoDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No exite un alumno',
      })
    }
    res.json({
      ok: true,
      alumno: alumnoDB,
    })
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado',
    })
  }
}

//crearAlumno Alumno
const crearAlumno = async (req, res = response) => {
  const uid = req.uid
  const { curp, nombre } = req.body
  try {
    const existeCurp = await Alumno.findOne({ curp })
    if (existeCurp) {
      return res.status(400).json({
        ok: false,
        msg: 'El CURP ya esta registrado',
      })
    }
    console.log('uid', uid)
    const alumno = new Alumno({
      ...req.body,
      usuarioCreated: uid,
    })
    await alumno.save()
    res.json({
      ok: true,
      alumno,
    })
  } catch (error) {
    console.log('error', error)
    res.status(500).json({
      ok: false,
      ...req.body,
      usuarioCreated: uid,
      msg: 'Error inesperado...  revisar logs',
    })
  }
}

//actualizarAlumno Alumno
const actualizarAlumno = async (req, res = response) => {
  //Validar token y comporbar si es el salumno

  const uid = req.params.id
  try {
    const alumnoDB = await Alumno.findById(uid).populate(
      'padres',
      'titular recoger nombre fechaNacimiento img nacionalidad curp telefonoCelular telefonoCasa email redSocial ocupacion  gradoMaximoEstudios estadoCivil calle numeroExterior numeroInterior colonia municipio estado codigoPostal entreCalles parentesco notas activated',
    )

    if (!alumnoDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No exite un alumno',
      })
    }

    const alumnoActualizado = await Alumno.findByIdAndUpdate(uid, req.body, {
      new: true,
    })
    res.json({
      ok: true,
      alumnoActualizado,
    })
  } catch (error) {
    console.log('error', error)
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado',
    })
  }
}
const borrarAlumno = async (req, res = response) => {
  const uid = req.params.id
  try {
    const alumnoDB = await Alumno.findById(uid)
    if (!alumnoDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No exite un alumno',
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
    const alumnoActualizado = await Alumno.findByIdAndUpdate(uid, campos, {
      new: true,
    })
    res.json({
      ok: true,
      alumnoActualizado,
    })
  } catch (error) {
    console.log('error', error)
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador',
    })
  }
}
const activarAlumno = async (req, res = response) => {
  const uid = req.params.id
  try {
    const alumnoDB = await Alumno.findById(uid)
    if (!alumnoDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No exite un alumno',
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
    const alumnoActualizado = await Alumno.findByIdAndUpdate(uid, campos, {
      new: true,
    })
    res.json({
      ok: true,
      alumnoActualizado,
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
  getAlumnos,
  crearAlumno,
  actualizarAlumno,
  borrarAlumno,
  activarAlumno,
  getAlumnoById,
  getAlumnosAll,
  getMyAlumno,
}
