import express from 'express';
import { AutorController } from '../controllers/autorController.mjs';
import { apiKeyMiddleware } from '../middlewares/apiKeyMiddleware.mjs';
import { adminMiddleware } from '../middlewares/adminMiddleware.mjs';

const router = express.Router();
const controller = new AutorController();

router.post('/', adminMiddleware, controller.crear)

router.get('/', controller.listar)

router.get('/:id', apiKeyMiddleware, controller.obtener)

router.delete('/:id', adminMiddleware, controller.eliminar)

export default router;