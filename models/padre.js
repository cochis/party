const { Schema, model } = require('mongoose')
const PadreSchema = Schema({
  hijo: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Alumno',
      required: true,
    },
  ],
  titular: {
    type: Boolean,
    required: true,
  },
  recoger: {
    type: Boolean,
    required: true,
  },
  nombre: {
    type: String,
    required: true,
  },
  fechaNacimiento: {
    type: Number,
  },
  img: {
    type: String,
  },
  nacionalidad: {
    type: String,
  },
  curp: {
    type: String,
  },
  telefonoCelular: {
    type: Number,
  },
  telefonoCasa: {
    type: Number,
  },
  email: {
    type: String,
  },
  redSocial: {
    type: String,
  },
  ocupacion: {
    type: String,
  },
  gradoMaximoEstudios: {
    type: String,
  },
  estadoCivil: {
    type: Schema.Types.ObjectId,
    ref: 'Catalogo',
  },
  calle: {
    type: String,
  },
  numeroExterior: {
    type: String,
  },
  numeroInterior: {
    type: String,
  },
  colonia: {
    type: String,
  },
  municipio: {
    type: String,
  },
  estado: {
    type: String,
  },
  codigoPostal: {
    type: String,
  },
  entreCalles: {
    type: String,
  },
  parentesco: {
    type: Schema.Types.ObjectId,
    ref: 'Catalogo',
  },
  notas: {
    type: String,
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
  usuarioCreated: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario',
  },
})

PadreSchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject()
  object.uid = _id
  return object
})
module.exports = model('Padre', PadreSchema)
