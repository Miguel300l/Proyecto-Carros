import { Schema, model } from 'mongoose';
import bcryptjs from 'bcryptjs';

const usuarioSchema = new Schema(
    {
        perfil:{
            idImg:{
                type: String,
                default: null
            },
            urlImg:{
                type: String,
                default: null
            }
        },
        nombres:{
            type: String,
            required: true
        },
        apellidos:{
            type: String,
            required: true
        },
        documento:{
            tipo:{
                type: String,
                required: true
            },
            numeroDocumento:{
                type: Number,
                required: true,
                unique: true
            }
        },
        genero:{
            type: String,
            required: true
        },
        correo:{
            type: String,
            required: true,
            unique: true
        },
        password:{
            type: String,
            required: true
        },
        numTelefono:{
            type: Number,
            required: true
        },
        rol:[{
            ref: "Roles",
            type: Schema.Types.ObjectId
        }],
        profesion:{
            type: String,
            default: null
        },
        
        motivoRechazo:{
            type:String,
            default:null
        },
        estado:{
            aceptado:{
                type: Boolean,
                default: true
            },
            habilitado:{
                type: Boolean,
                default: true
            },
            rechazado:{
                type:Boolean,
                default:false
            }
        },
        token_fbs:{
            type:String,
            default:null
        }
    },
    {
        versionKey: false
    }
)

usuarioSchema.methods.hasPassword = async(contrasena)=>{
    const salt = await bcryptjs.genSalt(10);
    return await bcryptjs.hash(contrasena, salt);
}

usuarioSchema.statics.validatePassword = async(contrasena, passwordUser)=>{
    return await bcryptjs.compare(contrasena, passwordUser);
}

export default model("Usuarios", usuarioSchema);