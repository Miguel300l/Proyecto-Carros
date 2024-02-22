import { Schema, model } from 'mongoose';

const programaSchema = new Schema(
    {
        nombre:{
            type: String,
            required: true
        },
        ficha:{
            type: Number,
            required: true,
            unique:true
        },
        fecha_inicio:{
            type: Date,
            required: true
        },
        fecha_final:{
            type: Date,
            required: true
        },
        jornada:{
            type: String,
            required: true
        },
        disponible:{
            type: Boolean,
            default: true
        }

    },
    {
        versionKey: false
    }
)

export default model("Programas", programaSchema)