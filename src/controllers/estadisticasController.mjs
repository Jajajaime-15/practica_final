import { EstadisticasService } from "../services/estadisticasService.mjs"

export class EstadisticasController{
    constructor() {
        this.service = new EstadisticasService();
    }

    librosConGeneros = async (req, res) => {
        try {
            const libros = await this.service.obtenerLibrosConGeneros();

            res.json({
                total: libros.length,
                data: libros
            });
        } catch (error) {
            console.error('Error al obtener el top de autores:', error);
            res.status(500).json({ error: 'Error al obtener el top de autores' });
        }
    };

    prestamosActivos = async (req, res) => {
        try {
            const prestamos = await this.service.obtenerPrestamosActivos();

            res.json({
                total: prestamos.length,
                prestamos: prestamos
            });
        } catch (error) {
            console.error('Error al obtener los prestamos activos:', error);
            res.status(500).json({ error: 'Error al obtener los prestamos activos' });
        }
    };
}