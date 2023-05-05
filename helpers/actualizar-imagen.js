const fs = require('fs')
const Usuario = require('../models/usuario')
const Maestro = require('../models/maestro')
const Alumno = require('../models/alumno')
const Curso = require('../models/curso')
const Padre = require('../models/padre')
const Grupo = require('../models/grupo')
const Tutorial = require('../models/tutorial')

const borrarImagen = (path) => {
  if (fs.existsSync(path)) {
    fs.unlinkSync(path)
  }
}
const actualizarImagen = async (tipo, id, nombreArchivo) => {
  let pathViejo = ''
  switch (tipo) {
    case 'grupos':
      const grupo = await Grupo.findById(id)
      if (!grupo) {
        return false
      }
      pathViejo = `./uploads/grupos/${grupo.img}`
      borrarImagen(pathViejo)
      grupo.img = nombreArchivo
      await grupo.save()
      return true
      break
    case 'padres':
      const padre = await Padre.findById(id)
      if (!padre) {
        return false
      }
      pathViejo = `./uploads/padres/${padre.img}`
      borrarImagen(pathViejo)
      padre.img = nombreArchivo
      await padre.save()
      return true
      break
    case 'alumnos':
      const alumno = await Alumno.findById(id)
      if (!alumno) {
        return false
      }
      pathViejo = `./uploads/alumnos/${alumno.img}`
      borrarImagen(pathViejo)
      alumno.img = nombreArchivo
      await alumno.save()
      return true
      break
    case 'usuarios':
      const usuario = await Usuario.findById(id)
      if (!usuario) {
        return false
      }
      pathViejo = `./uploads/usuarios/${usuario.img}`
      borrarImagen(pathViejo)
      usuario.img = nombreArchivo
      await usuario.save()
      return true
      break
    case 'maestros':
      const maestro = await Maestro.findById(id)
      if (!maestro) {
        return false
      }
      pathViejo = `./uploads/maestros/${maestro.img}`
      borrarImagen(pathViejo)
      maestro.img = nombreArchivo
      await maestro.save()
      return true
      break
    case 'cursos':
      const curso = await Curso.findById(id)
      if (!curso) {
        return false
      }
      pathViejo = `./uploads/cursos/${curso.img}`
      borrarImagen(pathViejo)
      maestro.img = nombreArchivo
      await curso.save()
      return true
      break
    case 'tutoriales':
      const tutorial = await Tutorial.findById(id)
      if (!tutorial) {
        return false
      }
      pathViejo = `./uploads/tutoriales/${tutorial.archivo}`
      borrarImagen(pathViejo)
      tutorial.archivo = nombreArchivo
      await tutorial.save()
      return true
      break
    default:
      break
  }
}

module.exports = {
  actualizarImagen,
}
