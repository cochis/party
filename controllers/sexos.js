const { response } = require("express");
const bcrypt = require("bcryptjs");
const Sexo = require("../models/sexo");
const { generarJWT } = require("../helpers/jwt");
//getsexos sexo
const getSexos = async (req, res) => {
  const sexos = await Sexo.find(
    {},
    "nombre clave img descripcion activated dateCreated lastEdited usuarioCreated "
  );
  res.json({
    ok: true,
    sexos,
    uid: req.uid,
  });
};

//crearsexo sexo
const crearSexo = async (req, res = response) => {
  const { clave, nombre } = req.body;
  const uid = req.uid;
  const sexo = new Sexo({
    usuario: uid,
    ...req.body,
  });

  try {
    const existeClave = await Sexo.findOne({ clave });
    if (existeClave) {
      return res.status(400).json({
        ok: false,
        msg: "El sexo ya está registrado",
      });
    }
    await sexo.save();
    res.json({
      ok: true,
      sexo,
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado...  revisar logs",
    });
  }
};

//actualizarsexo sexo
const actualizarSexo = async (req, res = response) => {
  //Validar token y comporbar si es el ssexo

  const uid = req.params.id;
  try {
    const sexoDB = await Sexo.findById(uid);

    if (!sexoDB) {
      return res.status(404).json({
        ok: false,
        msg: "No exite un sexo",
      });
    }
    const { ...campos } = req.body;
    const sexoActualizado = await Sexo.findByIdAndUpdate(uid, campos, {
      new: true,
    });
    res.json({
      ok: true,
      sexoActualizado,
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado",
    });
  }
};
const borrarSexo = async (req, res = response) => {
  const uid = req.params.id;
  try {
    const sexoDB = await Sexo.findById(uid);
    if (!sexoDB) {
      return res.status(404).json({
        ok: false,
        msg: "No exite un sexo",
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
    const sexoActualizado = await Sexo.findByIdAndUpdate(uid, campos, {
      new: true,
    });
    res.json({
      ok: true,
      sexoActualizado,
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};
const activarSexo = async (req, res = response) => {
  const uid = req.params.id;
  try {
    const sexoDB = await Sexo.findById(uid);
    if (!sexoDB) {
      return res.status(404).json({
        ok: false,
        msg: "No exite un sexo",
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
    const sexoActualizado = await Sexo.findByIdAndUpdate(uid, campos, {
      new: true,
    });
    res.json({
      ok: true,
      sexoActualizado,
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};
const getSexoById = async (req, res = response) => {
  const uid = req.params.uid;
  try {
    const sexoDB = await Sexo.findById(uid);
    if (!sexoDB) {
      return res.status(404).json({
        ok: false,
        msg: "No exite un catalogo",
      });
    }
    res.json({
      ok: true,
      catalogo: sexoDB,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error inesperado",
    });
  }
};
module.exports = {
  getSexos,
  crearSexo,
  actualizarSexo,
  borrarSexo,
  activarSexo,
  getSexoById,
};
