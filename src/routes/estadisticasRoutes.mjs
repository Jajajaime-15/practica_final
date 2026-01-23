import express from 'express';
import { EstadisticasController } from '../controllers/estadisticasController.mjs';
import { apiKeyMiddleware } from '../middlewares/apiKeyMiddleware.mjs';

const router = express.Router();
const controller = new EstadisticasController();

router.use(apiKeyMiddleware) // al aplicarse a todos el middleware se puede disponer por encima de ellos y asi funcionara adecuadamente

router.get('/libros-generos', controller.librosConGeneros) // primera consulta avanzada

router.get('/prestamos-activos', controller.prestamosActivos) // segunda consulta avanzada

export default router;