const { response } = require("express");
const bcrypt = require("bcryptjs");
const Grupo = require("../models/grupo");
const { generarJWT } = require("../helpers/jwt");
//getGrupos Grupo
const getGrupos = async (req, res) => {
  const grupos = await Grupo.find(
    {},
    "nombre clave img descripcion activated dateCreated lastedited usuarioCreated"
  );
  res.json({
    ok: true,
    grupos,
    uid: req.uid,
  });
};

//crearGrupo Grupo
const crearGrupo = async (req, res = response) => {
  const { clave, nombre } = req.body;
  const uid = req.uid;
  const grupo = new Grupo({
    usuario: uid,
    ...req.body,
  });

  try {
    const existeClave = await Grupo.findOne({ clave });
    if (existeClave) {
      return res.status(400).json({
        ok: false,
        msg: "El grupo ya está registrado",
      });
    }
    await grupo.save();
    res.json({
      ok: true,
      grupo,
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado...  revisar logs",
    });
  }
};

//actualizarGrupo Grupo
const actualizarGrupo = async (req, res = response) => {
  //Validar token y comporbar si es el sgrupo

  const uid = req.params.id;
  try {
    const grupoDB = await Grupo.findById(uid);

    if (!grupoDB) {
      return res.status(404).json({
        ok: false,
        msg: "No exite un grupo",
      });
    }
    const { ...campos } = req.body;
    const grupoActualizado = await Grupo.findByIdAndUpdate(uid, campos, {
      new: true,
    });
    res.json({
      ok: true,
      grupoActualizado,
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado",
    });
  }
};
const borrarGrupo = async (req, res = response) => {
  const uid = req.params.id;
  try {
    const grupoDB = await Grupo.findById(uid);
    if (!grupoDB) {
      return res.status(404).json({
        ok: false,
        msg: "No exite un grupo",
      });
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
    } = req.body;

    campos.activated = false;
    const grupoActualizado = await Grupo.findByIdAndUpdate(uid, campos, {
      new: true,
    });
    res.json({
      ok: true,
      grupoActualizado,
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};
const activarGrupo = async (req, res = response) => {
  const uid = req.params.id;
  try {
    const grupoDB = await Grupo.findById(uid);
    if (!grupoDB) {
      return res.status(404).json({
        ok: false,
        msg: "No exite un grupo",
      });
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
    } = req.body;

    campos.activated = true;
    const grupoActualizado = await Grupo.findByIdAndUpdate(uid, campos, {
      new: true,
    });
    res.json({
      ok: true,
      grupoActualizado,
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};
const getGruposById = async (req, res = response) => {
  const uid = req.params.uid;
  try {
    const grupoDB = await Grupo.findById(uid);
    if (!grupoDB) {
      return res.status(404).json({
        ok: false,
        msg: "No exite un catalogo",
      });
    }
    res.json({
      ok: true,
      catalogo: grupoDB,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error inesperado",
    });
  }
};
module.exports = {
  getGrupos,
  crearGrupo,
  actualizarGrupo,
  borrarGrupo,
  activarGrupo,
  getGruposById,
};
