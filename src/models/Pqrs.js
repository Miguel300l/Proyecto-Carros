import { Schema, model } from 'mongoose';

const prqsSchema = new Schema(
    {
        id_usuario:{
            ref: "Usuarios",
            type: Schema.Types.ObjectId
        },
        tipo:{
            type: String,
            required: true
        },
        motivo:{
            type: String,
            required: true
        },
        respuesta:{
            type: String,
            default: null
        },
        estado:{
            pendiente:{
                type: Boolean,
                default: true
            },
            respondida:{
                type: Boolean,
                default: false
            }
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
);
export default model("Pqrs", prqsSchema);