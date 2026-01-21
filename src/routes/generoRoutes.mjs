import express from "express"
import { GeneroController } from "../controllers/generoController.mjs"
import { apiKeyMiddleware } from "../middlewares/apiKeyMiddleware.mjs"
import { adminMiddleware } from "../middlewares/adminMiddleware.mjs"

const router = express.Router()
const controller = new GeneroController()

router.post('/', adminMiddleware, controller.crear) // endpoint para poder crear un genero nuevo, requiere ser admin

router.get('/', controller.listar) // endpoint para poder listar todos los generos, lo puede hacer cualquiera

router.get('/:id', apiKeyMiddleware, controller.obtener) // endpoint para poder buscar un genero por su id, requiere API key

router.delete('/:id', adminMiddleware, controller.eliminar) // endpoint para poder eliminar un genero, requiere ser admin

export default router