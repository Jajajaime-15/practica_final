import express from 'express';
import { EstadisticasController } from '../controllers/estadisticasController.mjs';
import { apiKeyMiddleware } from '../middlewares/apiKeyMiddleware.mjs';
import { adminMiddleware } from '../middlewares/adminMiddleware.mjs';

const router = express.Router();
const controller = new EstadisticasController();

router.get('/', controller) // primera consulta avanzada

router.get('/', controller) // segunda consulta avanzada

export default router;