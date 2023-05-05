const { response } = require("express");
const bcrypt = require("bcryptjs");
const Parentesco = require("../models/parentesco");
const { generarJWT } = require("../helpers/jwt");
//getParentescos Parentesco
const getParentescos = async (req, res) => {
  const parentescos = await Parentesco.find(
    {},
    "nombre clave img descripcion activated dateCreated lastEdited usuarioCreated "
  );
  res.json({
    ok: true,
    parentescos,
    uid: req.uid,
  });
};

//crearParentesco Parentesco
const crearParentesco = async (req, res = response) => {
  const { clave, nombre } = req.body;
  const uid = req.uid;
  const parentesco = new Parentesco({
    usuario: uid,
    ...req.body,
  });

  try {
    const existeClave = await Parentesco.findOne({ clave });
    if (existeClave) {
      return res.status(400).json({
        ok: false,
        msg: "El parentesco ya está registrado",
      });
    }
    await parentesco.save();
    res.json({
      ok: true,
      parentesco,
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado...  revisar logs",
    });
  }
};

//actualizarParentesco Parentesco
const actualizarParentesco = async (req, res = response) => {
  //Validar token y comporbar si es el sparentesco

  const uid = req.params.id;
  try {
    const parentescoDB = await Parentesco.findById(uid);

    if (!parentescoDB) {
      return res.status(404).json({
        ok: false,
        msg: "No exite un parentesco",
      });
    }
    const { ...campos } = req.body;
    const parentescoActualizado = await Parentesco.findByIdAndUpdate(
      uid,
      campos,
      {
        new: true,
      }
    );
    res.json({
      ok: true,
      parentescoActualizado,
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado",
    });
  }
};
const borrarParentesco = async (req, res = response) => {
  const uid = req.params.id;
  try {
    const parentescoDB = await Parentesco.findById(uid);
    if (!parentescoDB) {
      return res.status(404).json({
        ok: false,
        msg: "No exite un parentesco",
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
    const parentescoActualizado = await Parentesco.findByIdAndUpdate(
      uid,
      campos,
      {
        new: true,
      }
    );
    res.json({
      ok: true,
      parentescoActualizado,
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};
const activarParentesco = async (req, res = response) => {
  const uid = req.params.id;
  try {
    const parentescoDB = await Parentesco.findById(uid);
    if (!parentescoDB) {
      return res.status(404).json({
        ok: false,
        msg: "No exite un parentesco",
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
    const parentescoActualizado = await Parentesco.findByIdAndUpdate(
      uid,
      campos,
      {
        new: true,
      }
    );
    res.json({
      ok: true,
      parentescoActualizado,
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};
const getParentescoById = async (req, res = response) => {
  const uid = req.params.uid;
  try {
    const parentescoDB = await Parentesco.findById(uid);
    if (!parentescoDB) {
      return res.status(404).json({
        ok: false,
        msg: "No exite un catalogo",
      });
    }
    res.json({
      ok: true,
      catalogo: parentescoDB,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error inesperado",
    });
  }
};
module.exports = {
  getParentescos,
  crearParentesco,
  actualizarParentesco,
  borrarParentesco,
  activarParentesco,
  getParentescoById,
};
