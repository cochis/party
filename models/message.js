const { Schema, model } = require('mongoose')
const MessageSchema = Schema({
  titulo: {
    type: String,
    required: true,
  },
  de: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true,
  },
  para: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Alumno',
      required: true,
    },
  ],
  ciclo: {
    type: Schema.Types.ObjectId,
    ref: 'Ciclo',
    required: true,
  },
  curso: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Curso',
      required: true,
    },
  ],
  mensaje: {
    type: String,
    required: true,
  },
  file: {
    type: String,
  },
  typeFile: {
    type: String,
  },
  activated: {
    type: Boolean,
    default: true,
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

MessageSchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject()
  object.uid = _id
  return object
})
module.exports = model('Message', MessageSchema)
