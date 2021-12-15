const { Schema, model } = require('mongoose');


const InteresEstudianteSchema = Schema({
    empresa: {
        type: Schema.Types.ObjectId,
        ref: 'Empresa'
    },
    estudiante: {
        type: Schema.Types.ObjectId,
        ref: 'Estudiante'
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


module.exports = model('InteresEstudiante', InteresEstudianteSchema);