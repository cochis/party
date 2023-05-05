const { Schema, model } = require('mongoose')
const PagosCicloSchema = Schema({
  alumno: {
    type: Schema.Types.ObjectId,
    ref: 'Alumno',
  },
  curso: {
    type: Schema.Types.ObjectId,
    ref: 'Curso',
  },
  ciclo: {
    type: Schema.Types.ObjectId,
    ref: 'Catalogo',
  },
  pagos: [
    {
      type: Object,
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

PagosCicloSchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject()
  object.uid = _id
  return object
})
module.exports = model('PagosCiclo', PagosCicloSchema)
