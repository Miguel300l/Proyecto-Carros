import Usuario from '../models/Usuario.js';

export const validarCamposRegisterProfesional = async(req, res, next)=>{

    const { nombres, apellidos, tipo, numeroDocumento, genero, correo, numTelefono, profesion, contrasena, rol } = req.body;
    if(!nombres || !apellidos || !tipo || !numeroDocumento || !genero || !correo || !numTelefono || !profesion || !contrasena || !rol){
        return res.status(400).json("Todos los datos son requeridos");
    }
    const numIdentidadExistente = await Usuario.findOne({ "documento.numeroDocumento": numeroDocumento})
    if(numIdentidadExistente){
        return res.status(400).json("Numero de indetidad ya Registrado");
    }

    const correoExistente = await Usuario.findOne({ correo: correo})
    if(correoExistente){
        return res.status(400).json("Correo ya Registrado y en uso");
    }

    next();
}

export const validarCamposRegisterAprendiz = async(req, res, next)=>{
    const { nombres, apellidos, tipo, numeroDocumento, genero, correo, numTelefono, contrasena } = req.body;
    if(!nombres || !apellidos || !tipo || !numeroDocumento || !genero || !correo || !numTelefono || !contrasena){
        return res.status(400).json("Todos los datos son requeridos");
    }

    const numIdentidadExistente = await Usuario.findOne({ "documento.numeroDocumento" : numeroDocumento })
    if(numIdentidadExistente){
        return res.status(400).json("Numero de indetidad ya Registrado");
    }

    const correoExistente = await Usuario.findOne({ correo: correo})
    if(correoExistente){
        return res.status(400).json("Correo ya Registrado y en uso");
    }

    next();
}

export const validarCamposAuch = async (req, res, next)=>{
    const { correo, contrasena } = req.body;
    if(!correo || !contrasena){
        return res.status(400).json("Todos los datos son requeridos");
    }
    next();
}