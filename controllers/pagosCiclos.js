const { response } = require('express')
const bcrypt = require('bcryptjs')
const PagosCiclo = require('../models/pagosCiclo')
const PagosPorCiclo = require('../models/pagosPorCiclo')
const { generarJWT } = require('../helpers/jwt')
// PagosCiclo
const getPagosCiclos = async (req, res) => {
  const pagosCiclos = await PagosCiclo.find(
    {},
    'alumno curso ciclo pagos activated dateCreated lastEdited usuarioCreated ',
  )

    .populate('alumno', 'nombre  apellidoPaterno  apellidoMaterno clave uid')
    .populate('curso', 'nombre clave uid')
    .populate('ciclo', 'nombre clave uid')
  res.json({
    ok: true,
    pagosCiclos,
    uid: req.uid,
  })
}

//crearPagosCiclo PagosCiclo
const crearPagosCiclos = async (req, res = response) => {
  const { clave, nombre } = req.body
  const uid = req.uid
  const pagosCiclo = new PagosCiclo({
    usuario: uid,
    ...req.body,
  })

  try {
    await pagosCiclo.save()
    res.json({
      ok: true,
      pagosCiclo,
    })
  } catch (error) {
    console.log('error', error)
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado...  revisar logs',
    })
  }
}

//actualizarPagosCiclo PagosCiclo
const actualizarPagosCiclos = async (req, res = response) => {
  //Validar token y comporbar si es el spagosCiclo
  const uid = req.params.id
  try {
    const pagosCicloDB = await PagosCiclo.findById(uid)

    if (!pagosCicloDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No exite un pagosCiclo',
      })
    }
    const { ...campos } = req.body
    const pagosCicloActualizado = await PagosCiclo.findByIdAndUpdate(
      uid,
      campos,
      {
        new: true,
      },
    )
    const querty = { ciclo: campos.cicloPagado }
    if (campos.cantidadRestada !== 0) {
      campos.cantidadPagada = -campos.cantidadRestada
    }
    const pagosPorCiclo = await PagosPorCiclo.findOne(querty)
    if (pagosPorCiclo) {
      let pagoAgregado = {
        fechaPago: campos.fechaPago,
        alumno: campos.alumno,
        ciclo: campos.ciclo,
        facturar: !campos.facturar ? false : true,
        facturado: false,
        referencia: campos.referenciaPagada,
        cantidad: campos.cantidadPagada,
      }
      pagosPorCiclo.pagos = [...pagosPorCiclo.pagos, pagoAgregado]
      var newvalues = { $set: { pagos: pagosPorCiclo.pagos } }
      const pagosPorCicloActualizado = await PagosPorCiclo.updateOne(
        querty,
        newvalues,
      )
      res.json({
        ok: true,
        pagosCicloActualizado,
      })
    } else {
      let pago = {
        ciclo: campos.cicloPagado,
        pagos: [
          {
            fechaPago: campos.fechaPago,
            alumno: campos.alumno,
            ciclo: campos.ciclo,
            facturar: campos.facturar,
            facturado: false,
            referencia: campos.referenciaPagada,
            cantidad: campos.cantidadPagada,
          },
        ],
        activated: true,
        dateCreated: Date.now(),
        lastEdited: Date.now(),
        usuarioCreated: uid,
      }

      const pagosPorCiclo = new PagosPorCiclo({
        usuario: uid,
        ...pago,
      })

      await pagosPorCiclo.save()

      res.json({
        ok: true,
        pagosCicloActualizado,
      })
    }
  } catch (error) {
    console.log('error', error)
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado',
    })
  }
}
const actualizarFacturaPagosCiclos = async (req, res = response) => {
  //Validar token y comporbar si es el spagosCiclo

  const uid = req.params.id
  try {
    const pagosCicloDB = await PagosCiclo.findById(uid)

    if (!pagosCicloDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No exite un pagosCiclo',
      })
    }
    const { ...campos } = req.body

    const pagosCicloActualizado = await PagosCiclo.findByIdAndUpdate(
      uid,
      campos,
      {
        new: true,
      },
    )
    res.json({
      ok: true,
      pagosCicloActualizado,
    })
  } catch (error) {
    console.log('error', error)
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado',
    })
  }
}
const borrarPagosCiclos = async (req, res = response) => {
  const uid = req.params.id
  try {
    const pagosCicloDB = await PagosCiclo.findById(uid)
    if (!pagosCicloDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No exite un pagosCiclo',
      })
    }

    const { ...campos } = req.body

    campos.activated = false
    const pagosCicloActualizado = await PagosCiclo.findByIdAndUpdate(
      uid,
      campos,
      {
        new: true,
      },
    )
    res.json({
      ok: true,
      pagosCicloActualizado,
    })
  } catch (error) {
    console.log('error', error)
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador',
    })
  }
}
const activarPagosCiclos = async (req, res = response) => {
  const uid = req.params.id
  try {
    const pagosCicloDB = await PagosCiclo.findById(uid)
    if (!pagosCicloDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No exite un pagos Ciclo',
      })
    }

    const { ...campos } = req.body

    campos.activated = true
    const pagosCicloActualizado = await PagosCiclo.findByIdAndUpdate(
      uid,
      campos,
      {
        new: true,
      },
    )
    res.json({
      ok: true,
      pagosCicloActualizado,
    })
  } catch (error) {
    console.log('error', error)
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador',
    })
  }
}

const getCicloByAlumno = async (req, res) => {
  const alumno = req.params.alumno
  try {
    const cicloDB = await PagosCiclo.find({ alumno: alumno })

    if (!cicloDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No exite un ciclos',
      })
    }
    res.json({
      ok: true,
      pagosCiclos: cicloDB,
    })
  } catch (error) {
    console.log('error', error)
    res.status(500).json({
      ok: false,
      error,
      msg: 'Error inesperado',
    })
  }
}
const getCicloByCiclo = async (req, res) => {
  const ciclo = req.params.ciclo
  try {
    const cicloDB = await PagosCiclo.find({ ciclo: ciclo })

    if (!cicloDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No exite un ciclos',
      })
    }
    res.json({
      ok: true,
      pagosCiclo: cicloDB,
    })
  } catch (error) {
    console.log('error', error)
    res.status(500).json({
      ok: false,
      error,
      msg: 'Error inesperado',
    })
  }
}
const getCicloByCurso = async (req, res) => {
  const curso = req.params.curso
  try {
    const cicloDB = await PagosCiclo.find({ curso: curso })

    if (!cicloDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No exite un ciclos',
      })
    }
    res.json({
      ok: true,
      pagosCiclo: cicloDB,
    })
  } catch (error) {
    console.log('error', error)
    res.status(500).json({
      ok: false,
      error,
      msg: 'Error inesperado',
    })
  }
}

const getPagosCiclosById = async (req, res) => {
  const uid = req.params.uid
  try {
    const cicloDB = await PagosCiclo.findById(uid)
      .populate('alumno', ' nombre  apellidoPaterno  apellidoMaterno clave uid')
      .populate('curso', 'nombre  clave uid')
      .populate('ciclo', 'nombre clave uid')
    if (!cicloDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No exite tarjeta de pago',
      })
    }
    res.json({
      ok: true,
      pagoCiclo: cicloDB,
    })
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado',
    })
  }
}
const borrarCiclosById = async (req, res) => {
  const id = req.params.id
  try {
    const cicloDB = await PagosCiclo.findById(id)
    if (!cicloDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No exite tarjeta de pago',
      })
    }
    await PagosCiclo.findByIdAndDelete(id)
    res.json({
      ok: true,
      msg: 'Tarjeta eliminada ',
    })
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado',
    })
  }
}

module.exports = {
  getPagosCiclos,
  crearPagosCiclos,
  actualizarPagosCiclos,
  actualizarFacturaPagosCiclos,
  borrarPagosCiclos,
  activarPagosCiclos,
  getCicloByAlumno,
  getCicloByCiclo,
  getCicloByCurso,
  getPagosCiclosById,
  borrarCiclosById,
}
