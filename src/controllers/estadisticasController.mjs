import { EstadisticasService } from "../services/estadisticasService.mjs"

export class EstadisticasController{
    constructor() {
        this.service = new EstadisticasService();
    }

    /**
   * GET /api/admin/keys
   * Lista todas las API Keys registradas
   */
    topAutores = async (req, res) => {
        try {
        const autores = await this.service.topAutores();

        res.json({
            total: autores.length,
            keys: keautoresys.map(k => k.toJSON())
        });
        } catch (error) {
        console.error('Error en getAllKeys:', error);
        res.status(500).json({ error: 'Error al obtener las API Keys' });
        }
    };

}