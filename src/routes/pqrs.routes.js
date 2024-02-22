import { Router } from 'express';
import { verPqrsPendientes, crearPqrs, responderPqrs } from '../controllers/pqrs.controllers.js';
import { verificarAprendiz, verificarToken } from '../middlewares/validateToken.js';

const router = Router();

router.get("/verPqrsPendientes", verPqrsPendientes);
router.post("/crearPqrs",verificarToken, verificarAprendiz ,crearPqrs)
router.put("/responderPqrs/:id", responderPqrs)
export default router;