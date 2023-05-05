const { response } = require("express");
const bcrypt = require("bcryptjs");
const Role = require("../models/role");
const { generarJWT } = require("../helpers/jwt");
//getRoles Role
const getRoles = async (req, res) => {
  const roles = await Role.find(
    {},
    "nombre clave img descripcion activated dateCreated lastedited usuarioCreated"
  );
  res.json({
    ok: true,
    roles,
    uid: req.uid,
  });
};

//crearRole Role
const crearRole = async (req, res = response) => {
  const { clave, nombre } = req.body;
  const uid = req.uid;
  const role = new Role({
    usuario: uid,
    ...req.body,
  });

  try {
    const existeClave = await Role.findOne({ clave });
    if (existeClave) {
      return res.status(400).json({
        ok: false,
        msg: "El role ya está registrado",
      });
    }
    await role.save();
    res.json({
      ok: true,
      role,
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado...  revisar logs",
    });
  }
};

//actualizarRole Role
const actualizarRole = async (req, res = response) => {
  //Validar token y comporbar si es el srole

  const uid = req.params.id;
  try {
    const roleDB = await Role.findById(uid);

    if (!roleDB) {
      return res.status(404).json({
        ok: false,
        msg: "No exite un role",
      });
    }
    const { ...campos } = req.body;
    const roleActualizado = await Role.findByIdAndUpdate(uid, campos, {
      new: true,
    });
    res.json({
      ok: true,
      roleActualizado,
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado",
    });
  }
};
const borrarRole = async (req, res = response) => {
  const uid = req.params.id;
  try {
    const roleDB = await Role.findById(uid);
    if (!roleDB) {
      return res.status(404).json({
        ok: false,
        msg: "No exite un role",
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
    const roleActualizado = await Role.findByIdAndUpdate(uid, campos, {
      new: true,
    });
    res.json({
      ok: true,
      roleActualizado,
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};
const activarRole = async (req, res = response) => {
  const uid = req.params.id;
  try {
    const roleDB = await Role.findById(uid);
    if (!roleDB) {
      return res.status(404).json({
        ok: false,
        msg: "No exite un role",
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
    const roleActualizado = await Role.findByIdAndUpdate(uid, campos, {
      new: true,
    });
    res.json({
      ok: true,
      roleActualizado,
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};
const getRolesById = async (req, res = response) => {
  const uid = req.params.uid;
  try {
    const roleDB = await Role.findById(uid);
    if (!roleDB) {
      return res.status(404).json({
        ok: false,
        msg: "No exite un catalogo",
      });
    }
    res.json({
      ok: true,
      catalogo: roleDB,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error inesperado",
    });
  }
};
module.exports = {
  getRoles,
  crearRole,
  actualizarRole,
  borrarRole,
  activarRole,
  getRolesById,
};
