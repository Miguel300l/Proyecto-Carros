import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import { createRoles } from './libs/createRoles.js';

import usuarios from './routes/usuarios.routes.js';
import programa from './routes/programa.routes.js';
import eventos from './routes/eventos.routes.js';
import solicitudes from './routes/solicitudes.routes.js';
import notificacion from './routes/notificacion.routes.js';
import pqrs from './routes/pqrs.routes.js';

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

createRoles()

app.use(usuarios);
app.use(programa);
app.use(eventos);
app.use(solicitudes);
app.use(notificacion);
app.use(pqrs);

export default app;