const { Schema, model } = require('mongoose');

const EmpresaSchema = Schema({
  nombre: {
    type: String,
    required: true
  },
  rfc: {
    type: String,
    required: true
  },
  email: {
    type: String,
    require: true,
    uniqued: true
  },
  password: {
    type: String,
    uniqued: true
  },
  direccion: {
    type: String
  },
  descripcion: {
    type: String
  },
  created_at: {
    type: Date,
    required: true
  },
  updated_at: {
    type: Date,
    required: true
  },
  deleted_at: {
    type: Date,
    required: false
  }
});

EmpresaSchema.methods.toJSON = function () {
  const { __v, password, _id, ...empresa } = this.toObject();
  empresa.uid = _id;

  return empresa;
}


module.exports = model('Empresa', EmpresaSchema);
