import { Schema, model } from 'mongoose'

const pacienteSchema = new Schema({

    nombre: {
        type: String,
        required: true,
        trim: true
    },
    propietario: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    fecha: {
        type: Date,
        default: Date.now()
    },
    sintomas: {
        type: String,
        required: true,
        trim: true
    },
    veterinario: {
        type: Schema.Types.ObjectId,
        trim: true
    },

});

export default model('Paciente', pacienteSchema);