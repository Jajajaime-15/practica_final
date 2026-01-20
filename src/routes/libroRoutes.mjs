import express from 'express';
import { LibroController } from '../controllers/libroController.mjs';

const router = express.Router();
const controller = new LibroController();


router.post('/', controller.crear)


export default router;