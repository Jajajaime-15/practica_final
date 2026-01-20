import express from 'express';
import { UsuarioController } from '../controllers/usuarioController.mjs';
import { apiKeyMiddleware } from '../middlewares/apiKeyMiddleware.mjs';
import { adminMiddleware } from '../middlewares/adminMiddleware.mjs';

const router = express.Router();
const controller = new UsuarioController();



export default router;