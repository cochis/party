const { Schema, model } = require('mongoose')
const MenuSchema = Schema({
  titulo: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  roles: [
    {
      type: String,
    },
  ],
  submenu: [
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

MenuSchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject()
  object.uid = _id
  return object
})
module.exports = model('Menu', MenuSchema)
