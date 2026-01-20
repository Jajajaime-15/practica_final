import express from 'express';
import { UsuarioController } from '../controllers/usuarioController.mjs';
import { apiKeyMiddleware } from '../middlewares/apiKeyMiddleware.mjs';
import { adminMiddleware } from '../middlewares/adminMiddleware.mjs';

const router = express.Router();
const controller = new UsuarioController();

router.post('/', adminMiddleware, controller.crear)

router.get('/', adminMiddleware, controller.listar)

router.get('/:id', adminMiddleware, controller.obtener)

router.put('/:id', adminMiddleware, controller.actualizar)

router.delete('/:id', adminMiddleware, controller.eliminar)

export default router;