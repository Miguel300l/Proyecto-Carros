import Programa from "../models/Programa.js";

export const crearPrograma = async (req, res) => {
  try {
    const { nombre, ficha, fecha_inicio, fecha_final, jornada } = req.body;
    if (!nombre | !ficha || !fecha_inicio || !fecha_final || !jornada) {
      return res.status(400).json("!Todos los datos son requeridos");
    }
    const verficha = await Programa.findOne({ficha:ficha})
    if(verficha){
      return res.status(400).json("Numero de ficha ya existe")
    }

    const programaModel = new Programa(req.body);
    await programaModel.save();

    res.status(200).json("!Programa Creado");
  } catch (error) {
    console.log(error);
    return res.status(500).json(" Error en el servidor ");
  }
};

export const verProgramas = async (req, res) => {
  try {
    const programas = await Programa.find().lean();
    if (!programas) {
      return res.status(400).json("! Error al traer los programas!");
    }

    res.status(200).json(programas);

  } catch (error) {
    console.log(error);
    return res.status(500).json(" Error en el servidor ");
  }
};
