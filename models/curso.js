const { Schema, model } = require('mongoose')
const CursoSchema = Schema({
  nombre: {
    type: String,
    required: true,
  },
  clave: {
    type: String,
    required: true,
  },
  ciclo: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: 'Catalogo',
  },
  grado: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: 'Catalogo',
  },
  grupo: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: 'Catalogo',
  },
  alumnos: [
    {
      required: true,
      type: Schema.Types.ObjectId,
      ref: 'Alumno',
    },
  ],
  maestros: [
    {
      required: true,
      type: Schema.Types.ObjectId,
      ref: 'Maestro',
    },
  ],
  activated: {
    type: Boolean,
    default: false,
  },
  dateCreated: {
    type: Number,
    required: true,
    default: Date.now(),
  },
  lastEdited: {
    type: Number,
    required: true,
    default: Date.now(),
  },
  usuarioCreated: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario',
  },
})

CursoSchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject()
  object.uid = _id
  return object
})
module.exports = model('Curso', CursoSchema)
