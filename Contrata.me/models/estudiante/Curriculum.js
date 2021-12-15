const { Schema, model } = require('mongoose');

const formacionAcademica = Schema({
  escuela: {
    type: String,
    required: true
  },
  fecha_inicio: {
    type: String,
    required: true
  },
  fecha_fin: {
    type: String,
    required: true,
  }
});

const CurriculumSchema = Schema({
  estudiante: {
    type: Schema.Types.ObjectId,
    ref: 'Estudiante'
  },
  nombre: {
    type: String,
    required: [true, 'El nombre es obligatorio']
  },
  apellido_paterno: {
    type: String,
    required: [true, 'El apellido paterno es obligatorio']
  },
  apellido_materno: {
    type: String,
    require: [true, 'El apellido materno es obligatorio']
  },
  email: {
    type: String,
    required: [true, 'El email de contacto es obligatorio'],
    unique: true
  },
  descripcion: {
    type: String
  },
  telefono: {
    type: String,
    required: [true, 'El telefono de contacto es obligatorio']
  },
  tecnologias: [{
    type: String
  }],
  idiomas: [{
    type: String
  }],
  formacionAcademica: {
    type: String
  },
  direccion: {
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

CurriculumSchema.methods.toJSON = function () {
  const { _id, ...curriculum } = this.toObject();
  curriculum.cid = _id;
  return curriculum;
}

module.exports = model('Curriculum', CurriculumSchema);
