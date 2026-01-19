import express from 'express';
import { LibroController } from '../controllers/libroController.mjs';

const router = express.Router();
const controller = new LibroController();



export default router;