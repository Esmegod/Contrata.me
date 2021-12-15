const { Schema, model } = require('mongoose');
const Curriculum = require('./Curriculum');

const EstudianteSchema = Schema({
  nombre:{
    type: String,
    required: true
  },
  apellido_paterno:{
    type: String,
    required: true
  },
  apellido_materno:{
    type: String,
    required: true
  },
  email:{
    type: String,
    require: true,
    unique: true
  },
  password:{
    type: String,
    unique: true
  },
  semestre:{
    type: String,
    required: true
  },
  sexo:{
    type: String,
    required: true
  },
  telefono:{
    type:String,
    required:false
  },
  gitUser:{
    type:String,
    required:false
  },
  videoURL:{
    type:String,
    required:false
  }
});

EstudianteSchema.methods.toJSON = function(){
  const { __v, password, _id, ...estudiante } = this.toObject();
  estudiante.uid = _id;

  return estudiante;
}

module.exports = model('Estudiante', EstudianteSchema );
