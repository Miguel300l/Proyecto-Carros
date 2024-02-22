import Usuario from "../models/Usuario.js";
import Roles from "../models/Roles.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config.js";
import cloudinary from 'cloudinary'

export const registroUsuarioAdministrador = async (req, res) => {
  try {
    const { tipo, numeroDocumento, contrasena, rol } = req.body;

    const usuarioAdministrador = new Usuario(req.body);
    usuarioAdministrador.documento.tipo = tipo;
    usuarioAdministrador.documento.numeroDocumento = numeroDocumento;
    usuarioAdministrador.password = await usuarioAdministrador.hasPassword(
      contrasena
    );

    if (rol) {
      const rolesExistentes = await Roles.find({ nombre: { $in: rol } });
      usuarioAdministrador.rol = rolesExistentes.map((rol) => rol._id);
    }

    const usuarioSave = usuarioAdministrador.save();

    res.status(200).json({
      messagge: "Administrador Registrado Correctamente",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json(" Error en el servidor ");
  }
};

export const registroUsuarioProfesional = async (req, res) => {

  try {
    const { tipo, numeroDocumento, contrasena, rol } = req.body;

    let idImg = null;
    let urlImg = null;

    if (req.files.imgProfesional) {
      const fotoEvento = await cloudinary.uploader.upload(
        req.files.imgProfesional[0].path
      );
      idImg = fotoEvento.public_id;
      urlImg = fotoEvento.secure_url;
    }

    const usuarioProfesional = new Usuario(req.body);
    usuarioProfesional.perfil.idImg = idImg;
    usuarioProfesional.perfil.urlImg = urlImg;
    usuarioProfesional.documento.tipo = tipo;
    usuarioProfesional.documento.numeroDocumento = numeroDocumento;
    usuarioProfesional.password = await usuarioProfesional.hasPassword(
      contrasena
    );

    if (rol) {
      usuarioProfesional.estado.aceptado = false;
      usuarioProfesional.estado.habilitado = false;
      const rolesExistentes = await Roles.find({ nombre: { $in: rol } });
      usuarioProfesional.rol = rolesExistentes.map((rol) => rol._id);
    }

    await usuarioProfesional.save();

    res.status(200).json({
      messagge: "Profesional Registrado Correctamente",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json(" Error en el servidor ");
  }
};

export const registroUsuarioAprendiz = async (req, res) => {
  try {
    const { tipo, numeroDocumento, contrasena } = req.body;

    let idImg = null;
    let urlImg = null;

    if (req.files.imgAprendiz) {
      const fotoEvento = await cloudinary.uploader.upload(
        req.files.imgAprendiz[0].path
      );
      idImg = fotoEvento.public_id;
      urlImg = fotoEvento.secure_url;
    }

    const usuarioAprendiz = new Usuario(req.body);
    usuarioAprendiz.perfil.idImg = idImg;
    usuarioAprendiz.perfil.urlImg = urlImg;
    usuarioAprendiz.documento.tipo = tipo;
    usuarioAprendiz.documento.numeroDocumento = numeroDocumento;
    usuarioAprendiz.password = await usuarioAprendiz.hasPassword(contrasena);

    const rolExistente = await Roles.findOne({ nombre: "aprendiz" });
    usuarioAprendiz.rol = [rolExistente._id];

    const usuarioSave = usuarioAprendiz.save();

    const token = jwt.sign({ id: usuarioSave._id }, JWT_SECRET, {
      expiresIn: 86400,
    });

    res.status(200).json({
      token: token,
      messagge: "Usuario Creado Correctamente",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json(" Error en el servidor ");
  }
};
export const actualizarProfesional = async (req, res) => {
  try {
    const { nombres, apellidos, correo, genero, numTelefono, profesion } =
      req.body;
      const { id } = req.params;

      
      if (req.files.imgProfesional) {
      let idImg = null;
      let urlImg = null;

      if (req.files && req.files.imgProfesional) {
        const fotoProfesional = await cloudinary.uploader.upload(
          req.files.imgProfesional[0].path
        );
        idImg = fotoProfesional.public_id;
        urlImg = fotoProfesional.secure_url;

        const profesional = await Usuario.findByIdAndUpdate(
          id,
          {
            "perfil.idImg": idImg,
            "perfil.urlImg": urlImg,
            nombres: nombres,
            apellidos: apellidos,
            correo: correo,
            profesion: profesion,
            genero: genero,
            numTelefono: numTelefono,
          },
          { new: true }
        );
      }
    } else {
      const profesional = await Usuario.findByIdAndUpdate(
        id,
        {
          nombres: nombres,
          apellidos: apellidos,
          correo: correo,
          profesion: profesion,
          genero: genero,
          numTelefono: numTelefono,
        },
        { new: true }
      );
    }

    res.status(200).json("Usuarios actualizado");
  } catch (error) {
    console.log(error);
    return res.status(500).json("Error en el servidor");
  }
};

export const actualizarAprendiz = async (req, res) => {
  try {
    console.log(req.body);
    const { nombres, apellidos, correo, genero, numTelefono } = req.body;
    const { id } = req.params;
   
if(req.files.imgAprendiz){

  let idImg = null;
  let urlImg = null;

  if (req.files && req.files.imgAprendiz) { 
    const fotoAprendiz = await cloudinary.uploader.upload(req.files.imgAprendiz[0].path);
    idImg = fotoAprendiz.public_id;
    urlImg = fotoAprendiz.secure_url;
  }

  const usuario = await Usuario.findByIdAndUpdate(id, {
    
      'perfil.idImg': idImg,
      'perfil.urlImg': urlImg,
      'nombres': nombres,
      'apellidos': apellidos,
      'correo': correo,
      'genero': genero,
      'numTelefono': numTelefono
    
  }, { new: true });
}else{

  const usuario = await Usuario.findByIdAndUpdate(id, {
    'nombres': nombres,
    'apellidos': apellidos,
    'correo': correo,
    'genero': genero,
    'numTelefono': numTelefono
  
}, { new: true });
}


    res.status(200).json("Usuario actualizado");
  } catch (error) {
    console.log(error);
    return res.status(500).json("Error en el servidor");
  }
}


export const loginUsuarioProfesional = async (req, res) => {
  try {
    const { correo, contrasena } = req.body;
    const usuarioExistente = await Usuario.findOne({ correo: correo }).populate(
      "rol"
    );
    if (!usuarioExistente) {
      return res.status(400).json("Correo Incorrecto");
    }

    const validatePassword = await Usuario.validatePassword(
      contrasena,
      usuarioExistente.password
    );
    if (!validatePassword) {
      return res.status(400).json("Contraseña Incorrecta");
    }

    const tieneRolProfesional = usuarioExistente.rol.some(
      (rol) => rol.nombre === "profesional"
    );
    if (!tieneRolProfesional) {
      return res.status(400).json("!No Autorizado!");
    }

    const aceptado = usuarioExistente.estado.aceptado;
    const habilitado = usuarioExistente.estado.habilitado;
    if (!aceptado || !habilitado) {
      return res.status(400).json("!Debes esperar a ser aceptado!");
    }


    const token = jwt.sign({ id: usuarioExistente._id }, JWT_SECRET, {
      expiresIn: 18000000,
    });

    res.status(200).json({
      token: token,
      messagge: "!Login Profesional Correcto!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json(" Error en el servidor ");
  }
};

export const loginUsuarioAprendiz = async (req, res) => {
  try {
    const { correo, contrasena } = req.body;
    const usuarioExistente = await Usuario.findOne({ correo: correo }).populate(
      "rol"
    );
    if (!usuarioExistente) {
      return res.status(400).json("Correo Incorrecto");
    }

    const validatePassword = await Usuario.validatePassword(
      contrasena,
      usuarioExistente.password
    );
    if (!validatePassword) {
      return res.status(400).json("Contraseña Incorrecta");
    }

    const tieneRolAprendiz = usuarioExistente.rol.some(
      (rol) => rol.nombre === "aprendiz"
    );
    if (!tieneRolAprendiz) {
      return res.status(400).json("!No Autorizado!");
    }

    const token = jwt.sign({ id: usuarioExistente._id }, JWT_SECRET, {
      expiresIn: 18000000,
    });

    res.status(200).json({
      token: token,
      messagge: "!Login Aprediz Correcto!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json(" Error en el servidor ");
  }
};

export const loginUsuarioAdministrador = async (req, res) => {
  try {
    const { correo, contrasena } = req.body;
    const usuarioExistente = await Usuario.findOne({ correo: correo }).populate(
      "rol"
    );
    if (!usuarioExistente) {
      return res.status(400).json("Correo Incorrecto");
    }

    const validatePassword = await Usuario.validatePassword(
      contrasena,
      usuarioExistente.password
    );
    if (!validatePassword) {
      return res.status(400).json("Contraseña Incorrecta");
    }

    const tieneRolAdministrador = usuarioExistente.rol.some(
      (rol) => rol.nombre === "administrador"
    );
    if (!tieneRolAdministrador) {
      return res.status(400).json("!No Autorizado!");
    }

    const token = jwt.sign({ id: usuarioExistente._id }, JWT_SECRET, {
      expiresIn: 18000000,
    });

    res.status(200).json({
      token: token,
      messagge: "!Login Administrador Correcto!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json(" Error en el servidor ");
  }
};

export const solicitudAccesoProfesional = async (req, res) => {
  try {
    const usuarios = await Usuario.find({
      "estado.aceptado": false, "estado.habilitado": false,
      "estado.rechazado": false
    }).populate("rol");

    if (!usuarios) {
      return res
        .status(400)
        .json("!Error al traer las solicitdes de acceso como profesional!");
    }

    const usuariosConRolProfesional = [];

    usuarios.forEach((usuario) => {
      if (usuario.rol && usuario.rol.length > 0) {
        usuario.rol.forEach((rol) => {
          if (rol.nombre === "profesional") {
            usuariosConRolProfesional.push(usuario);
          }
        });
      }
    });

    res.status(200).json(usuariosConRolProfesional);
  } catch (error) {
    console.log(error);
    return res.status(500).json(" Error en el servidor ");
  }
};
export const solicitudRechazadasProfesional = async (req, res) => {
  try {
    const usuarios = await Usuario.find({ "estado.aceptado": false, "estado.habilitado": false, "estado.rechazado": true }).populate("rol");

    if (!usuarios) {
      return res.status(400).json("!Error al traer las solicitdes de acceso como profesional!");
    }

    const usuariosConRolProfesional = [];

    usuarios.forEach((usuario) => {
      if (usuario.rol && usuario.rol.length > 0) {
        usuario.rol.forEach((rol) => {
          if (rol.nombre === "profesional") {
            usuariosConRolProfesional.push(usuario);
          }
        });
      }
    });

    res.status(200).json(usuariosConRolProfesional);
  } catch (error) {
    console.log(error);
    return res.status(500).json(" Error en el servidor ");
  }
};

export const aceptarProfesional = async (req, res) => {
  try {
    const { id } = req.params;
    const profesionaAceptado = await Usuario.findByIdAndUpdate(id, {
      "estado.aceptado": true,
      "estado.habilitado": true,
      "estado.rechazado": false,
    });
    if (!profesionaAceptado) {
      return res.status(400).json("!No Se pudo aceptar el profesional!");
    }
    res.status(200).json("Profesional Aceptado");
  } catch (error) {
    console.log(error);
    return res.status(500).json(" Error en el servidor ");
  }
};
export const rechazarProfesional = async (req, res) => {
  try {
    const { id } = req.params;
    const { motivoRechazo } = req.body;
    if (!motivoRechazo) {
      return res.status(400).json("! Se requiere un motivo de rechazo !")
    }
    const profesionaRechazado = await Usuario.findByIdAndUpdate(id, {
      "estado.aceptado": false,
      "estado.habilitado": false,
      "estado.rechazado": true,
      motivoRechazo: motivoRechazo
    });
    if (!profesionaRechazado) {
      return res.status(400).json("! No se pudo rechazar el profesional !");
    }
    res.status(200).json("Profesional Rechazado");
  } catch (error) {
    console.log(error);
    return res.status(500).json(" Error en el servidor ");
  }
};


export const verUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await Usuario.findById(id).populate("rol");

    if (!usuario) {
      return res.status(400).json("Error al traer el usuario");
    }

    res.status(200).json(usuario);
  } catch (error) {
    console.log(error);
    return res.status(500).json(" Error en el servidor ");
  }
}
export const verUsuarios = async (req, res) => {
  try {
    const usuario = await Usuario.find();
    
    if (!usuario) {
      return res.status(400).json("Error al traer el usuario");
    }

    res.status(200).json(usuario);
  } catch (error) {
    console.log(error);
    return res.status(500).json(" Error en el servidor ");
  }
}

export const verUsuariosProfesionales = async (req, res) => {
  try {
    const usuarios = await Usuario.find({
      "estado.aceptado": true,
      "estado.habilitado": true,
    }).populate("rol");

    const usuariosConRolProfesional = [];
    usuarios.forEach((usuario) => {
      if (usuario.rol && usuario.rol.length > 0) {
        usuario.rol.forEach((rol) => {
          if (rol.nombre === "profesional") {
            usuariosConRolProfesional.push(usuario);
          }
        });
      }
    });

    res.status(200).json(usuariosConRolProfesional);

  } catch (error) {
    console.log(error);
    return res.status(500).json(" Error en el servidor ");
  }
};
export const inhabilitarUsuario = async (req, res) => {
  try {
    const { id } = req.params;

    const usuarioInhabilitado = await Usuario.findByIdAndUpdate(
      id,
      { "estado.habilitado": false },
      { new: true }
    );

    if (!usuarioInhabilitado) {
      return res.status(400).json("No se pudo inhabilitar el usuario");
    }

    res.status(200).json("Usuario inhabilitado");
  } catch (error) {
    console.log(error);
    return res.status(500).json("Error en el servidor");
  }
};
export const habilitarUsuario = async (req, res) => {
  try {
    const { id } = req.params;

    const usuarioInhabilitado = await Usuario.findByIdAndUpdate(
      id,
      { "estado.habilitado": true },
      { new: true }
    );

    if (!usuarioInhabilitado) {
      return res.status(400).json("No se pudo habilitar el usuario");
    }

    res.status(200).json("Usuario habilitado");
  } catch (error) {
    console.log(error);
    return res.status(500).json("Error en el servidor");
  }
};

export const inhabilitarProfesional = async (req, res) => {
  try {
    const { id } = req.params;

    const usuarioInhabilitado = await Usuario.findByIdAndUpdate(
      id,
      { "estado.habilitado": false },
      { new: true }
    );

    if (!usuarioInhabilitado) {
      return res.status(400).json("No se pudo inhabilitar el Profesional");
    }

    res.status(200).json("Profesional inhabilitado");
  } catch (error) {
    console.log(error);
    return res.status(500).json("Error en el servidor");
  }
};

export const habilitarProfesional = async (req, res) => {
  try {
    const { id } = req.params;

    const usuarioInhabilitado = await Usuario.findByIdAndUpdate(
      id,
      { "estado.habilitado": true },
      { new: true }
    );

    if (!usuarioInhabilitado) {
      return res.status(400).json("No se pudo habilitar el profesional");
    }

    res.status(200).json("Profesional habilitado");
  } catch (error) {
    console.log(error);
    return res.status(500).json("Error en el servidor");
  }
};
export const verProfesionales = async (req, res) => {
  try {
    const usuarios = await Usuario.find().populate("rol");

    const usuariosConRolProfesional = [];
    usuarios.forEach((usuario) => {
      if (usuario.rol && usuario.rol.length > 0) {
        usuario.rol.forEach((rol) => {
          if (rol.nombre === "profesional") {
            usuariosConRolProfesional.push(usuario);
          }
        });
      }
    });

    res.status(200).json(usuariosConRolProfesional);
  } catch (error) {
    console.log(error);
    return res.status(500).json(" Error en el servidor ");
  }
};


