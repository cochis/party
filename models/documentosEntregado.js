const { Schema, model } = require("mongoose");
const DocumentoEntregadoSchema = Schema({
  usuario: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
  },
  documento: {
    type: Schema.Types.ObjectId,
    ref: "Documento",
  },
  img: {
    type: String,
  },
  descripcion: {
    type: String,
    required: true,
  },
  entregado: {
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
    ref: "Usuario",
  },
});

DocumentoEntregadoSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.uid = _id;
  return object;
});
module.exports = model("DocumentoEntregado", DocumentoEntregadoSchema);
