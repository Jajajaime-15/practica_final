import express from 'express';
import { AutorController } from '../controllers/autorController.mjs';

const router = express.Router();
const controller = new AutorController();



export default router;