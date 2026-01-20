import express from 'express';
import { PrestamoController } from '../controllers/prestamoController.mjs';
import { apiKeyMiddleware } from '../middlewares/apiKeyMiddleware.mjs';
import { adminMiddleware } from '../middlewares/adminMiddleware.mjs';

const router = express.Router();
const controller = new PrestamoController();



export default router;