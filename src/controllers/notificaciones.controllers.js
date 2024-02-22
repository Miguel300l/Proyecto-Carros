import Notificaciones from '../models/Notificaciones.js';
import Usuario from '../models/Usuario.js';

export const misNotificaciones = async(req, res)=>{
    try {
        const { id } = req.params;
        const misNotis = await Notificaciones.find({ usuarioId: id }).lean().populate("profesionalId aprendizId usuarioId");
        if(!misNotis){
            return res.status(400).json("Error al mostrar mis notificaciones");
        }
        res.status(200).json(misNotis);
    } catch (error) {
        console.log(error);
        return res.status(500).json(" Error en el servidor ");
    }
}

export const notificacionesAbiertas = async (req,res)=>{

    try {
    const {id} = req.params;
     await Notificaciones.findByIdAndUpdate(id, {
        "estado": true,
    });

    res.status(200).json("Notificacion vista");
        
    } catch (error) {
        console.log(error);
        return res.status(500).json("Error en el sevridor");
    }

}

export const guardarToken= async(req,res)=>{
    try {
        const {id}=req.params
        if(!id){
            return res.status(402).json("Se requiere el id del usuario")
        }
        const {token}=req.body
        if(!token){
            return res.status(401).json("Se requiere el Token")
        }
        const userToken = await Usuario.findByIdAndUpdate(id,{
            token_fbs:token
        })
        return res.status(200).json("Token Guardado")
    } catch (error) {
        console.log(error)
        res.status(400).json("Error en el servidor")
    }
}