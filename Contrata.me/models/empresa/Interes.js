const { Schema, model } = require('mongoose');


const InteresOfertaSchema = Schema({
    oferta: {
        type: Schema.Types.ObjectId,
        ref: 'Oferta'
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


module.exports = model('InteresOferta', InteresOfertaSchema);