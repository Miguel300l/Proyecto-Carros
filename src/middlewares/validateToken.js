import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config.js';
import Usuario from '../models/Usuario.js';

export const verificarToken = async(req, res, next)=>{
    try {
        const token = req.headers["acceso-token"];
        if(!token){
            return res.status(400).json("Se requiere el token");
        }

        const decodificacion = jwt.verify(token, JWT_SECRET);
        req.usuarioId = decodificacion.id;
        const usuario = await Usuario.findById(req.usuarioId);
        if(!usuario){
            return res.status(400).json("Usuario no existente");
        }

        next();

    } catch (error) {
        return res.status(400).json("No autorizado");
    }
}

export const verificarAdministrador = async(req, res, next)=>{
    const usuarioAdministrador = await Usuario.findById(req.usuarioId).populate("rol");
    const isAdministrador = usuarioAdministrador.rol.some((rol)=> rol.nombre === "administrador");
    if(!isAdministrador){
        return res.status(400).json("No eres usuario administrador");
    }
    next()
}

export const verificarProfesional = async(req, res, next)=>{
    const usuarioProfesional = await Usuario.findById(req.usuarioId).populate("rol");
    const isProfesional = usuarioProfesional.rol.some((rol)=> rol.nombre === "profesional")
    if(!isProfesional){
        return res.status(400).json("No eres usuario Profesional");
    }
    next()
}


export const verificarAprendiz = async(req, res, next)=>{
    console.log(req.body)
    const usuarioAprenidiz = await Usuario.findById(req.usuarioId).populate("rol");
    const isAprendiz = usuarioAprenidiz.rol.some((rol)=> rol.nombre === "aprendiz")
    if(!isAprendiz){
        return res.status(400).json("No eres usuario Aprendiz");
    }
    next()
}