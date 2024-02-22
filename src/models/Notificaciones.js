import { Schema, model } from "mongoose";

const notificacionesSchema = new Schema(
  {
    titulo:{
      type:String,
    },
    contenido: {
      type: String,
    },
    motivo:{
     type:String
    },
    estado:{
      type:Boolean,
      default:false
    },
    usuarioId: {
      ref: "Usuarios",
      type: Schema.Types.ObjectId
    },
    profesionalId:{
      ref:"Usuarios",
      type: Schema.Types.ObjectId
    },
    fechaAplazada:{
      type:String
    },
    aprendizId:{
      ref : "Usuarios",
      type: Schema.Types.ObjectId
    }
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export default model("Notificaciones", notificacionesSchema);
