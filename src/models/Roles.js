import { Schema, model } from 'mongoose';

const rolesSchema = new Schema(
    {
        nombre:{
            type: String
        }
    },
    {
        versionKey: false
    }
)

export default model("Roles", rolesSchema);