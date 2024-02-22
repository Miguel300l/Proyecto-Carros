import { Schema, model } from 'mongoose';

const eventosSchema = new Schema(
    {
        titulo: {
            type: String,
            required: true
        },
        descripcion: {
            type: String,
            required: true
        },
        imagen: {
            idImg: {
                type: String,
                default: null
            },
            urlImg: {
                type: String,
                default: null
            }
        },
        pdf: {
            idPdf: {
                type: String,
                default: null
            },
            urlPdf: {
                type: String,
                default: null
            }
        },

        estado: {
            type: Boolean,
            default: true
        },
        lugar: {
            type: String,
            default: null
        }

    },
    {
        timestamps: true,
        versionKey: false
    }
)

export default model("Eventos", eventosSchema)