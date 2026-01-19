import express from 'express';
import { PrestamoController } from '../controllers/prestamoController.mjs';

const router = express.Router();
const controller = new PrestamoController();



export default router;