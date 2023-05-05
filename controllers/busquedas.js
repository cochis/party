const { response } = require('express')
const bcrypt = require('bcryptjs')
const { generarJWT } = require('../helpers/jwt')

const Usuario = require('../models/usuario')
const Curso = require('../models/curso')
const Maestro = require('../models/maestro')
const Padre = require('../models/padre')
const Alumno = require('../models/alumno')
const Ciclo = require('../models/ciclo')

//getCiclos Ciclo
const getTodo = async (req, res = response) => {
  const busqueda = req.params.busqueda
  const regex = new RegExp(busqueda, 'i')

  const [usuarios, maestros, alumnos, padres, cursos] = await Promise.all([
    Usuario.find({
      nombre: regex,
    }),
    Maestro.find({
      nombre: regex,
    }),

    Alumno.find({
      nombre: regex,
    }).populate('currentCurso', 'nombre uid'),
    Padre.find({
      nombre: regex,
    }).populate('hijo', 'nombre apellidoPaterno apellidoMaterno   uid '),
    Curso.find({
      nombre: regex,
    })
      .populate('ciclo', 'nombre uid ')
      .populate('grado', 'nombre uid ')
      .populate('grupo', 'nombre uid '),
  ])
  res.json({
    ok: true,
    busqueda,
    uid: req.uid,
    usuarios,
    maestros,
    alumnos,
    padres,
    cursos,
  })
}
const getDocumentosColeccion = async (req, res = response) => {
  const busqueda = req.params.busqueda
  const tabla = req.params.tabla
  const regex = new RegExp(busqueda, 'i')
  let data = []
  switch (tabla) {
    case 'usuarios':
      data = await Usuario.find({
        $or: [
          { nombre: regex },
          { apellidoPaterno: regex },
          { apellidoMaterno: regex },
          { role: regex },
          { email: regex },
        ],
      })
      console.log('data', data)
      break
    case 'cursos':
      data = await Curso.find({ nombre: regex })

      break
    case 'maestros':
      data = await Maestro.find({ nombre: regex })

      break
    case 'padres':
      data = await Padre.find({ nombre: regex })

      break
    case 'alumnos':
      data = await Alumno.find({ nombre: regex })

      break

    default:
      res.status(400).json({
        ok: false,
        msg: 'No se encontro  la tabla',
      })
  }

  res.json({
    ok: true,
    busqueda,
    uid: req.uid,
    resultados: data,
  })
}

module.exports = {
  getTodo,
  getDocumentosColeccion,
}
