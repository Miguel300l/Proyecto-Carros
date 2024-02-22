import { Schema, model } from "mongoose";

const solicitudSchema = new Schema(
  {
    fechaSolicitada: {
      type: Date,
    },
    motivo:{
        type: String
    },
    nuevaFechaPropuesta: {
      type: Date,
      default: null,
    },
    motivoAplazamiento: {
      type: String,
      default: null,
    },
    estado: {
        pendiente: {
          type: Boolean,
          default: true,
        },
        aceptada: {
          type: Boolean,
          default: false,
        },
        aplazada: {
          type: Boolean,
          default: false,
        },
      },
    id_aprendiz: {
      type: Schema.Types.ObjectId,
      ref: "Usuarios",
      required: true
    },
    id_profesional: {
      type: Schema.Types.ObjectId,
      ref: "Usuarios",
      required: true
    },
  },
  {
    versionKey: false,
  }
);

export default model("Solicitudes", solicitudSchema);
