import express from 'express';
import { LibroController } from '../controllers/libroController.mjs';
import { apiKeyMiddleware } from '../middlewares/apiKeyMiddleware.mjs';
import { adminMiddleware } from '../middlewares/adminMiddleware.mjs';

const router = express.Router();
const controller = new LibroController();

router.post('/', adminMiddleware, controller.crear)

router.get('/', controller.listar)

router.get('/:id', apiKeyMiddleware, controller.obtener)

router.put('/:id', adminMiddleware, controller.actualizar)

router.delete('/:id', adminMiddleware, controller.eliminar)

export default router;