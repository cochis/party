const { response } = require('express')
const bcrypt = require('bcryptjs')
const Documento = require('../models/documento')
const { generarJWT } = require('../helpers/jwt')
//getDocumentos Documento
const getDocumentos = async (req, res) => {
  const documentos = await Documento.find(
    {},
    'nombre clave img descripcion activated dateCreated lastEdited usuarioCreated ',
  )
  res.json({
    ok: true,
    documentos,
    uid: req.uid,
  })
}

//crearDocumento Documento
const crearDocumento = async (req, res = response) => {
  const { clave, nombre } = req.body
  const uid = req.uid
  const documento = new Documento({
    usuario: uid,
    ...req.body,
  })

  try {
    const existeClave = await Documento.findOne({ clave })
    if (existeClave) {
      return res.status(400).json({
        ok: false,
        msg: 'El documento ya está registrado',
      })
    }
    await documento.save()
    res.json({
      ok: true,
      documento,
    })
  } catch (error) {
    console.log('error', error)
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado...  revisar logs',
    })
  }
}

//actualizarDocumento Documento
const actualizarDocumento = async (req, res = response) => {
  //Validar token y comporbar si es el sdocumento

  const uid = req.params.id
  try {
    const documentoDB = await Documento.findById(uid)

    if (!documentoDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No exite un documento',
      })
    }
    const { ...campos } = req.body
    const documentoActualizado = await Documento.findByIdAndUpdate(
      uid,
      campos,
      {
        new: true,
      },
    )
    res.json({
      ok: true,
      documentoActualizado,
    })
  } catch (error) {
    console.log('error', error)
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado',
    })
  }
}
const borrarDocumento = async (req, res = response) => {
  const uid = req.params.id
  try {
    const documentoDB = await Documento.findById(uid)
    if (!documentoDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No exite un documento',
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
    const documentoActualizado = await Documento.findByIdAndUpdate(
      uid,
      campos,
      {
        new: true,
      },
    )
    res.json({
      ok: true,
      documentoActualizado,
    })
  } catch (error) {
    console.log('error', error)
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador',
    })
  }
}
const activarDocumento = async (req, res = response) => {
  const uid = req.params.id
  try {
    const documentoDB = await Documento.findById(uid)
    if (!documentoDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No exite un documento',
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
    const documentoActualizado = await Documento.findByIdAndUpdate(
      uid,
      campos,
      {
        new: true,
      },
    )
    res.json({
      ok: true,
      documentoActualizado,
    })
  } catch (error) {
    console.log('error', error)
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador',
    })
  }
}
const getDocumentoById = async (req, res = response) => {
  const uid = req.params.uid
  try {
    const documentoDB = await Documento.findById(uid)
    if (!documentoDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No exite un catalogo',
      })
    }
    res.json({
      ok: true,
      catalogo: documentoDB,
    })
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado',
    })
  }
}
module.exports = {
  getDocumentos,
  crearDocumento,
  actualizarDocumento,
  borrarDocumento,
  activarDocumento,
  getDocumentoById,
}
