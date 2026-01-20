import express from 'express';
import { AutorController } from '../controllers/autorController.mjs';
import { apiKeyMiddleware } from '../middlewares/apiKeyMiddleware.mjs';
import { adminMiddleware } from '../middlewares/adminMiddleware.mjs';

const router = express.Router();
const controller = new AutorController();

router.post('/', apiKeyMiddleware, controller.crear)

router.get('/', controller.listar)

router.get('/:id', controller.obtener)

router.put('/:id', apiKeyMiddleware, controller.actualizar)

router.delete('/:id', adminMiddleware, controller.eliminar)

export default router;