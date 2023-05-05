const { Schema, model } = require('mongoose')
const TutorialSchema = Schema({
  nombre: {
    type: String,
    required: true,
  },
  clave: {
    type: String,
    required: true,
  },
  titulo: {
    type: String,
    required: true,
  },
  subtitulo: {
    type: String,
    required: true,
  },
  archivo: {
    type: String,
  },
  descripcion: {
    type: String,
  },
  dirigido: {
    type: String,
  },
  cursos: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Curso',
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
  usuarioEdited: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario',
  },
})

TutorialSchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject()
  object.uid = _id
  return object
})
module.exports = model('Tutorial', TutorialSchema)
