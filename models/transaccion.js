const { Schema, model } = require('mongoose')
const TransaccionSchema = Schema({
  tipo: {
    type: String,
    required: true,
  },
  folio: {
    type: Number,
    required: true,
  },

  fechaExpedicion: {
    type: Number,
    required: true,
  },
  lugarExpedicion: {
    type: String,
    required: true,
  },

  alumno: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: 'Alumno',
  },
  descripcion: {
    type: String,
    required: true,
  },
  precio: {
    type: Number,
    required: true,
  },

  metodoPago: {
    type: String,
    required: true,
  },
  referenciaBancaria: {
    type: String,
    default: '',
  },
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
  usuarioEdited: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario',
  },
  usuarioCreated: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario',
  },
})

TransaccionSchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject()
  object.uid = _id
  return object
})
module.exports = model('Transaccion', TransaccionSchema)
