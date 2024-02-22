import Roles from "../models/Roles.js";

export const createRoles = async (req, res) => {
  try {

    const contador = await Roles.estimatedDocumentCount();
    if (contador > 0) {
      return;
    }

    await Promise.all([
      new Roles({ nombre: "administrador" }).save(),
      new Roles({ nombre: "profesional" }).save(),
      new Roles({ nombre: "aprendiz" }).save()
    ]);

  } catch (error) {
    console.error(error);
  }
};
