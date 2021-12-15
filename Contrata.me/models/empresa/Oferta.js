const { Schema, model } = require('mongoose');


const OfertaSchema = Schema({
    empresa: {
        type: Schema.Types.ObjectId,
        ref: 'Empresa'
    },
    titulo: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    puesto: {
        type: String,
        required: true
    },
    sueldo: {
        type: String,
        requierd: true
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


module.exports = model('Oferta', OfertaSchema);