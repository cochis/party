const { response } = require('express')
const bcrypt = require('bcryptjs')
const Padre = require('../models/padre')
const { generarJWT } = require('../helpers/jwt')
//getPadres Padre
const getPadres = async (req, res) => {
  const desde = Number(req.query.desde) || 0

  const [padres, total] = await Promise.all([
    Padre.find(
      {},
      ' hijo titular recoger nombre fechaNacimiento img nacionalidad curp telefonoCelular telefonoCasa email redSocial ocupacion gradoMaximoEstudios estadoCivil calle numeroExterior numeroInterior colonia municipio estado codigoPostal entreCalles parentesco notas activated dateCreated lastEdited usuarioCreated  uid',
    )
      .populate(
        'hijo',
        'nombre apellidoPaterno apellidoMaterno clave sexo fechaNacimiento curp nacionalidad entidadNacimiento peso estatura tipoSanguineo telefono calle numeroExterior numeroInterior colonia codigoPostal estado municipio grado documentosEntregados padres currentCurso notas usuarioCreated usuario activated dateCreated lastEdited uid ',
      )
      .populate('parentesco', 'uid nombre clave uid')
      .skip(desde)
      .limit(5),
    Padre.countDocuments(),
  ])

  res.json({
    ok: true,
    padres,
    uid: req.uid,
  })
}

//crearPadre Padre
const crearPadre = async (req, res = response) => {
  const { curp, nombre } = req.body
  const uid = req.uid
  const padre = new Padre({
    usuario: uid,
    ...req.body,
  })
  try {
    const existeCurp = await Padre.findOne({ curp })
    if (existeCurp) {
      return res.status(400).json({
        ok: false,
        msg: 'El CURP ya está registrado',
      })
    }
    await padre.save()
    res.json({
      ok: true,
      padre,
    })
  } catch (error) {
    console.log('error', error)
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado...  revisar logs',
    })
  }
}

//actualizarPadre Padre
const actualizarPadre = async (req, res = response) => {
  //Validar token y comporbar si es el spadre

  const uid = req.params.id
  try {
    const padreDB = await Padre.findById(uid)

    if (!padreDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No exite un padre',
      })
    }

    const padreActualizado = await Padre.findByIdAndUpdate(uid, req.body, {
      new: true,
    })
    res.json({
      ok: true,
      padreActualizado,
    })
  } catch (error) {
    console.log('error', error)
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado',
    })
  }
}
const borrarPadre = async (req, res = response) => {
  const uid = req.params.id
  try {
    const padreDB = await Padre.findById(uid)
    if (!padreDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No exite un padre',
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
    const padreActualizado = await Padre.findByIdAndUpdate(uid, campos, {
      new: true,
    })
    res.json({
      ok: true,
      padreActualizado,
    })
  } catch (error) {
    console.log('error', error)
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador',
    })
  }
}
const activarPadre = async (req, res = response) => {
  const uid = req.params.id
  try {
    const padreDB = await Padre.findById(uid)
    if (!padreDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No exite un padre',
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
    const padreActualizado = await Padre.findByIdAndUpdate(uid, campos, {
      new: true,
    })
    res.json({
      ok: true,
      padreActualizado,
    })
  } catch (error) {
    console.log('error', error)
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador',
    })
  }
}

const getPadreById = async (req, res = response) => {
  const uid = req.params.id
  try {
    const padreDB = await Padre.findById(uid)
    if (!padreDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No exite un padre',
      })
    }
    res.json({
      ok: true,
      padre: padreDB,
    })
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado',
    })
  }
}
module.exports = {
  getPadres,
  crearPadre,
  actualizarPadre,
  borrarPadre,
  activarPadre,
  getPadreById,
}
