const { Schema, model } = require('mongoose')
const MaestroSchema = Schema({
  nombre: {
    type: String,
    required: true,
  },
  apellidoPaterno: {
    type: String,
    required: true,
  },
  apellidoMaterno: {
    type: String,
    required: true,
  },
  clave: {
    type: String,
    required: true,
  },
  sexo: {
    type: Schema.Types.ObjectId,
    ref: 'Catalogo',
    required: true,
  },
  fechaNacimiento: {
    type: Number,
    required: true,
  },
  curp: {
    type: String,
    required: true,
  },

  nacionalidad: {
    type: String,
    required: true,
  },

  entidadNacimiento: {
    type: String,
    required: true,
  },
  peso: {
    type: Number,
  },
  estatura: {
    type: Number,
  },
  tipoSanguineo: {
    type: Schema.Types.ObjectId,
    ref: 'Catalogo',
  },
  telefonoCasa: {
    type: Number,
  },
  telefonoCelular: {
    type: Number,
  },

  email: {
    type: String,
    required: true,
  },

  gradoMaximoEstudios: {
    type: String,
    required: true,
  },
  estadoCivil: {
    type: Schema.Types.ObjectId,
    ref: 'Catalogo',
    required: true,
  },
  calle: {
    type: String,
    required: true,
  },
  numeroExterior: {
    type: String,
  },
  numeroInterior: {
    type: String,
  },
  colonia: {
    type: String,
    required: true,
  },
  codigoPostal: {
    type: String,
    required: true,
  },
  estado: {
    type: String,
    required: true,
  },
  municipio: {
    type: String,
    required: true,
  },
  entreCalles: {
    type: String,
    required: true,
  },

  materias: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Catalogo',
    },
  ],
  grados: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Catalogo',
    },
  ],
  img: {
    type: String,
  },
  documentosEntregados: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Catalogo',
    },
  ],
  currentCurso: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Curso',
    },
  ],

  notas: {
    type: String,
  },
  usuario: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario',
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

MaestroSchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject()
  object.uid = _id
  return object
})
module.exports = model('Maestro', MaestroSchema)
