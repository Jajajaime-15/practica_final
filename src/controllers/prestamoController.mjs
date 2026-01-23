import { PrestamoService } from '../services/prestamoService.mjs';

export class PrestamoController {

  constructor(prestamoService) {
    this.service = new PrestamoService;
  }

  crear = async (req, res) => {
    try {
      const { libro_id, usuario_id } = req.body;
      const prestamo = await this.service.crearPrestamo({
        libro_id,
        usuario_id
      });

      res.status(201).json({
        message: 'Prestamo creado exitosamente',
        data: prestamo.toJSON()
      });
    } catch (error) {
      console.error('Error al crear prestamo:', error);
      res.status(400).json({ error: 'Error al crear un prestamo' });
    }
  };

  listar = async (req, res) => {
    try {
      const prestamos = await this.service.mostrarPrestamos();

      res.json({
        total: prestamos.length,
        prestamos: prestamos.map(p => p.toJSON())
      });
    } catch (error) {
      console.error('Error al obtener prestamos:', error);
      res.status(500).json({ error: 'Error al obtener prestamos' });
    }
  };

  obtener = async (req, res) => {
    try {
      const { id } = req.params;
      const prestamo = await this.service.buscarPrestamo(id);

      res.json({
        prestamo: prestamo
      });
    } catch (error) {
      console.error('Error al obtener prestamo:', error);
      res.status(500).json({ error: 'Error al obtener el prestamo por id' });
    }
  };

  actualizar = async (req, res) => {
    try {
      const { id } = req.params;
      const prestamoActualizado = await this.service.actualizarEstado(id);

      res.status(200).json({
        message: 'Estado del prestamo actualizado exitosamente',
        data: prestamoActualizado.toJSON()
      });
    } catch (error) {
      console.error('Error al actualizar prestamo:', error);
      res.status(400).json({ error: 'Error al actualizar prestamo' });
    }
  };

  eliminar = async (req, res) => {
    try {
      const { id } = req.params;
      const prestamo = await this.service.eliminarPrestamo(id);
      res.status(200).json({ 
        message: 'Prestamo eliminado exitosamente',
        data: prestamo.toJSON()
      });
    } catch (error) {
      console.error('Error al eliminar prestamo:', error);
      res.status(500).json({ error: 'Error al eliminar el prestamo' });
    }
  };
}