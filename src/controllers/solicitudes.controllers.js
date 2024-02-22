import Solicitudes from "../models/Solicitudes.js";
import Notificaciones from "../models/Notificaciones.js";
import Usuario from "../models/Usuario.js";
import moment from 'moment'
import { fechaLocal } from './../funciones/fechaLocal.js';
import admin from 'firebase-admin'

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: "ejemplonotificacionescap-3631c",
    clientEmail: "firebase-adminsdk-q59dk@ejemplonotificacionescap-3631c.iam.gserviceaccount.com",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCr7ErxSO6+MnVi\n1tGi8Wb6Z6d7IgMiwwh5vyY0We5q74zT+ZxoYy7pic6W16xiEq+aNXKFKwFf57C1\n1FNM6Yas48UCBxl4DBRw8WSBglBkh2kf+mOx3wYCmo1Q1Sa1fYEoqlwJl/IJ8ffA\n1EjbrXiiQhMP+Ra1FjgWOQ5fLJHPzV7taGGrJXr9khE7g5ANRHocGvHC1BQ/asJ4\n9sFJdaL+SpeizH68abhF3gl5XjKwy0Qebt5n1u4QgRCH6+rc9rKlJhPMB3188yMs\nHNnRcf71xEz0wcgp5mxz4qIUEOUqin25iETT/wpfvXZNFBATRoOgqoD4mL7eW8IC\nvdKC/afBAgMBAAECggEAC3oXuqnKvkmyCmoazozc+gRnatHnca+hZjc7fq0uPFdH\niHMWXOWaIR8A+pLlQBrNPDcrMPag/d0Cr/C/qtfAFNSTt0HwElKEHtIOipK/eSaM\n/wSBGUOxLAVTP70q+1yofaV5xW4uSzmq92V0g6296t8MVLmlKWuVTO58JiBcj4mj\nLeniLx4/4GXzB9hO0uEpAxzZGTHeI90GCUlMDU1ArMsc9JXL5kZKk4LF7gTNlj1r\noZ6S1zge7pyGpYfcIosXrqRUP59Y44sMeuby91Z66UcNl12BvWJCoTo1i8TxKsYM\nGHg2ZLJ9gnofFhd/9vw/fUbsKhAcpGe+BQgY1ZvuQQKBgQDbXwBMJSGXItOjQMwa\n9AK75eIi6NssuFunUqYXFEJZ6GNEoCKrn12uxXYnpIW5pFu8ZAfPD5XwjVpbPgzh\nMhEWJUScMVGCP0TEQC79BLoANzk3XzxxG8zBveg1pI6P1J5hyUqa+IPKK9Tg1Veh\nb7TIkT7MfIF7Gm/CgcbwPSmtuQKBgQDIoSCh5i/znYxQ9+NczeQvXMp/CRQJEm4y\nmIP2TMOGSe9p9zWHRljRDAAcTKPVQ7syWnxVDCEIWmYBaY5stWqK5vt0Np3X9pcF\nsLAFRlgEYDhpSyS6EVGMFFALEa6h45KmAH1kwdvnfzztsd1uUWcawkZY2ipqh7Ar\n7elCBPMOSQKBgBX2J9B3syovSWLBnO1h2lg3RnFaQH70ofBZXNlYpN/dXPrE0VO/\nK6DQkeicFusj4i81EHcRR2CCtjYGO0HcQkumRX0hjthsPxUqm8mmzHwzCx5ZAXMN\nZm1K9tFP/Rm3HngJr9dd48u8oZ40nYZC6aVerRvJpyjM171wQptQdDi5AoGAWNxc\n2rhcdrdKJbaVgk5DCeM8YSXBNP9vxYMdt6JqW3k1zCZNFBxJTFXXWrFrQxMbv4Kq\nXPThUJTRZ0C8b1Ou29TQfLmQEc5LN575Z2yvoUiI08IPg0YWa0e36B8tzNBB7Lp8\nz3q5joAhmVnVLH5rf0Oa6tG+Ra7RjbNzQ+VzTdkCgYEAkJEAn5yRmVbb71KrtCXd\nxOIBWfpyQ9ljLQzaqa2iZyEo/YKrKHylgiwY5ErTk/0uAx8ZEscJ1qt3FWkl5Ooe\nJmWqBjnrAghdDDQDhO0JOY8jhnSYkfoZxtvRRCFqDfa1IOQsfNRw1FQ2MQyJp2OZ\njfLZjlWAO62Ud1qwskZxGIs=\n-----END PRIVATE KEY-----\n",

  })
})

let ultimoTiempoSolicitud = {};

export const crearSolicitud = async (req, res) => {
  try {
    const { fechaSolicitada, motivo, id_aprendiz, id_profesional } = req.body;
    if (!fechaSolicitada || !motivo || !id_aprendiz || !id_profesional) {
      return res.status(400).json("Todos los datos son requeridos");
    }
    // if (ultimoTiempoSolicitud[id_aprendiz]) {
    //   const tiempoTranscurrido = moment().diff(ultimoTiempoSolicitud[id_aprendiz], 'minutes');
    //   if (tiempoTranscurrido < 30) {
    //     return res.status(400).json("Debes esperar al menos 30 minutos antes de crear otra solicitud");
    //   }
    // }

    const solicitudesModel = new Solicitudes(req.body);
    await solicitudesModel.save();

    ultimoTiempoSolicitud[id_aprendiz] = moment();

    res.status(200).json("Solicitud enviada correctamente");
  } catch (error) {
    console.log(error);
    return res.status(500).json("Error en el servidor");
  }
};

export const verSolicitudes = async (req, res) => {
  try {
    const { id } = req.params;
    const usuarioAdmin = await Usuario.findById(id).populate("rol");

    const esAdmin = usuarioAdmin.rol.some(
      (rol) => rol.nombre === "administrador"
    );

    if (!esAdmin) {
      return res.status(400).json("No eres Administrador");
    }

    const misSolicitudes = await Solicitudes.find({
      "estado.pendiente": true,
      "estado.aceptada": false,
      "estado.aplazada": false,
    }).populate({
      path: "id_aprendiz id_profesional",
      populate: {
        path: "programa",
      },
    });

    if (!misSolicitudes) {
      return res.status(400).json("Error al ver las solicitudes");
    }

    res.status(200).json(misSolicitudes);
  } catch (error) {
    console.log(error);
    return res.status(500).json(" Error en el servidor ");
  }
};

export const aceptarSolicitud = async (req, res) => {
  try {
    const { id } = req.params;
    const solicitudAceptada = await Solicitudes.findByIdAndUpdate(id, {
      "estado.pendiente": false,
      "estado.aceptada": true,
      "estado.aplazada": false,
    });
    if (!solicitudAceptada) {
      return res.status(400).json("No se pudo aceptar la solicitud");
    }

    const usuario = solicitudAceptada.id_aprendiz;
    const usuarioProfesional = solicitudAceptada.id_profesional;
    const aprendiz_fbs = await Usuario.findById(usuario)
    const profesional_fbs = await Usuario.findById(usuarioProfesional)
    const cadenaFecha = fechaLocal(solicitudAceptada.fechaSolicitada)
    const contenido = `Tu solicitud ha sido aceptada, la fecha de la atención sera ${cadenaFecha}`;

    const notificacionModel = new Notificaciones();
    notificacionModel.titulo = "Solicitud Aceptada";
    notificacionModel.contenido = contenido;
    notificacionModel.usuarioId = usuario;
    notificacionModel.fechaAplazada = cadenaFecha;
    notificacionModel.profesionalId = usuarioProfesional
    if(aprendiz_fbs.token_fbs){

      const message = {
        token: aprendiz_fbs.token_fbs,
        notification: {
          title: "Nuevo mensaje",
          body: contenido
        }
      }
      const response = await admin.messaging().send(message);
      console.log("Mensaje enviado:", response); 
    }
    await notificacionModel.save();

    const contenidoProfesional = `Tienes una una nueva cita para la fecha ${cadenaFecha}`;

    const notificacionProfesionalModel = new Notificaciones();
    notificacionProfesionalModel.titulo = " Nueva Charla ";
    notificacionProfesionalModel.contenido = contenidoProfesional;
    notificacionProfesionalModel.fechaAplazada = cadenaFecha;
    notificacionProfesionalModel.usuarioId = usuarioProfesional;
    if(profesional_fbs.token_fbs){

      const mensaje = {
        token: profesional_fbs.token_fbs,
        notification: {
          title: "Nuevo mensaje",
          body: contenidoProfesional
        }
      }
      const respuesta = await admin.messaging().send(mensaje);
      console.log("Mensaje enviado:", respuesta);
    }
    await notificacionProfesionalModel.save();

    res.status(200).json("Solicitud Aceptada");
  } catch (error) {
    console.log(error);
    return res.status(500).json(" Error en el servidor ");
  }
};

export const aplazarSolicitud = async (req, res) => {
  try {
    const { id } = req.params;
    const { motivo, nuevaFecha, nuevoProfesional } = req.body;
    if (!motivo || !nuevaFecha) {
      return res.status(400).json("Se requiere un motivo y nueva fecha");
    }
    const solicitudAplazada = await Solicitudes.findByIdAndUpdate(
      id,
      {
        nuevaFechaPropuesta: nuevaFecha,
        motivoAplazamiento: motivo,
        "estado.pendiente": false,
        "estado.aceptada": false,
        "estado.aplazada": true,
        id_profesional: nuevoProfesional,
      },
      { new: true }
    );

    if (!solicitudAplazada) {
      return res.status(400).json("No se pudo aplazar la solicitud");
    }
    const usuario = solicitudAplazada.id_aprendiz;
    const cadenaFecha = fechaLocal(solicitudAplazada.nuevaFechaPropuesta)
    const aprendiz_fbs = await Usuario.findById(usuario)
    const profesional_fbs = await Usuario.findById(nuevoProfesional)

    const contenido = `Tu solicitud a sido aplazada, la nueva fecha de atencion es ${cadenaFecha}`;

    const notificacionModel = new Notificaciones();
    notificacionModel.titulo = "Solicitud Aplazada";
    notificacionModel.contenido = contenido;
    notificacionModel.usuarioId = usuario;
    notificacionModel.fechaAplazada = cadenaFecha;
    notificacionModel.profesionalId = nuevoProfesional
    notificacionModel.motivo = motivo;
    await notificacionModel.save();
if(aprendiz_fbs.token_fbs){

  const message = {
    token: aprendiz_fbs.token_fbs,
    notification: {
      title: "Nuevo mensaje",
      body: contenido
    }
  }
  const response = await admin.messaging().send(message);
  console.log("Mensaje enviado:", response);
}

    const usuarioProfesional = solicitudAplazada.id_profesional;
    const contenidoProfesional = `Tienes una una nueva cita para el dia ${cadenaFecha}`;

    const notificacionProfesionalModel = new Notificaciones();
    notificacionProfesionalModel.titulo = "Nueva Charla";
    notificacionProfesionalModel.contenido = contenidoProfesional;
    notificacionProfesionalModel.usuarioId = usuarioProfesional
    notificacionProfesionalModel.fechaAplazada = cadenaFecha;
    notificacionProfesionalModel.aprendizId = usuario;
    if(profesional_fbs.token_fbs){

    const mensaje = {
      token: profesional_fbs.token_fbs,
      notification: {
        title: "Nuevo mensaje",
        body: contenidoProfesional
      }
    }
    const respuesta = await admin.messaging().send(mensaje);
    console.log("Mensaje enviado:", respuesta);
  }
    await notificacionProfesionalModel.save();

    res.status(200).json("Solicitud Aplazada");
  } catch (error) {
    console.log(error);
    return res.status(500).json(" Error en el servidor ");
  }
};

export const verSolicitudesProfesional = async (req, res) => {
  try {
    const { id } = req.params;
    const usuarioProfesional = await Usuario.findById(id).populate("rol");

    const esProfesional = usuarioProfesional.rol.some(
      (rol) => rol.nombre === "profesional"
    );

    if (!esProfesional) {
      return res.status(400).json("No eres un Profesional");
    }

    const misSolicitudes = await Solicitudes.find({
      id_profesional: id,
      "estado.pendiente": true,
      "estado.aceptada": false,
      "estado.aceptada": false,
    });
    if (!misSolicitudes) {
      return res.status(400).json("Error al ver mis solicitudes");
    }

    res.status(200).json(misSolicitudes);
  } catch (error) {
    console.log(error);
    return res.status(500).json(" Error en el servidor ");
  }
};
