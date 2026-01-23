import express from 'express';
import { PrestamoController } from '../controllers/prestamoController.mjs';
import { adminMiddleware } from '../middlewares/adminMiddleware.mjs';

const router = express.Router();
const controller = new PrestamoController();

router.use(adminMiddleware) // al aplicarse a todos el middleware se puede disponer por encima de ellos y asi funcionara adecuadamente

router.post('/', controller.crear)

router.get('/', controller.listar)

router.get('/:id', controller.obtener)

router.put('/:id', controller.actualizar)

router.delete('/:id', controller.eliminar)

export default router;