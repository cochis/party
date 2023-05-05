const { response } = require('express')
const bcrypt = require('bcryptjs')
const Menu = require('../models/menu')
const { generarJWT } = require('../helpers/jwt')
//getMenus Menu
const getMenus = async (req, res) => {
  const menus = await Menu.find()
  res.json({
    ok: true,
    menus,
    uid: req.uid,
  })
}

const getMenuById = async (req, res) => {
  const uid = req.params.uid
  try {
    const menuDB = await Menu.findById(uid)
    if (!menuDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No exite un ciclo',
      })
    }
    res.json({
      ok: true,
      menu: menuDB,
    })
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado',
    })
  }
}

//crearMenu Menu
const crearMenu = async (req, res = response) => {
  const { titulo } = req.body
  const uid = req.uid
  const menu = new Menu({
    menu: uid,
    ...req.body,
  })

  try {
    const existeAno = await Menu.findOne({ titulo })
    if (existeAno) {
      return res.status(400).json({
        ok: false,
        msg: 'La titulo ya está registrado',
      })
    }
    await menu.save()
    res.json({
      ok: true,
      menu,
    })
  } catch (error) {
    console.log('error', error)
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado...  revisar logs',
    })
  }
}

//actualizarMenu Menu
const actualizarMenu = async (req, res = response) => {
  //Validar token y comporbar si es el smenu

  const uid = req.params.id
  try {
    const menuDB = await Menu.findById(uid)

    if (!menuDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No exite un menu',
      })
    }
    const menuActualizado = await Menu.findByIdAndUpdate(uid, req.body, {
      new: true,
    })
    res.json({
      ok: true,
      menuActualizado,
    })
  } catch (error) {
    console.log('error', error)
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado',
    })
  }
}
const borrarMenu = async (req, res = response) => {
  const uid = req.params.id
  try {
    const menuDB = await Menu.findById(uid)
    if (!menuDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No exite un menu',
      })
    }

    const { titulo, icon, roles, submenu, ...campos } = req.body

    campos.activated = false
    const menuActualizado = await Menu.findByIdAndUpdate(uid, campos, {
      new: true,
    })
    res.json({
      ok: true,
      menuActualizado,
    })
  } catch (error) {
    console.log('error', error)
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador',
    })
  }
}
const activarMenu = async (req, res = response) => {
  const uid = req.params.id
  try {
    const menuDB = await Menu.findById(uid)
    if (!menuDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No exite un menu',
      })
    }

    const { titulo, icon, roles, submenu, ...campos } = req.body

    campos.activated = true
    const menuActualizado = await Menu.findByIdAndUpdate(uid, campos, {
      new: true,
    })
    res.json({
      ok: true,
      menuActualizado,
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
  getMenus,
  crearMenu,
  actualizarMenu,
  borrarMenu,
  activarMenu,
  getMenuById,
}
