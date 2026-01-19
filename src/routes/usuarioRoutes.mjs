import express from 'express';
import { UsuarioController } from '../controllers/usuarioController.mjs';

const router = express.Router();
const controller = new UsuarioController();



export default router;