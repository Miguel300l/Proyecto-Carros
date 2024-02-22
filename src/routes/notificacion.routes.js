import { Router } from 'express';
import { guardarToken, misNotificaciones, notificacionesAbiertas } from '../controllers/notificaciones.controllers.js';

const router = Router();

router.get("/notificaciones/:id", misNotificaciones);
router.put("/notificacionVista/:id", notificacionesAbiertas)
router.put("/actualizarToken/:id",guardarToken)

export default router;