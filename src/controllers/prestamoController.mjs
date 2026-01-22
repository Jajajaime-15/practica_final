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
        message: 'Prestamo creado exitosamente'
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
        prestamos: prestamos.map(p => p.toJSON()) //NO LO RECONOCE
      });
    } catch (error) {
      console.error('Error al obtener prestamos:', error);
      res.status(500).json({ error: 'Error al obtener prestamos' });
    }
  };

  obtener = async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const prestamo = await this.service.buscarPrestamo(id);

      res.json({
        prestamo: prestamo
      });
    } catch (error) {
      console.error('Error al obtener prestamo:', error);
      res.status(500).json({ error: 'Error al obtener el prestamo por id' });
    }
  };

  //-----------REVISAR--------
  obtenerPrestamosPorLibro = async (req, res) => {
    try {
      const libro_id = parseInt(req.params.libro_id);

      const prestamos = await this.service.obtenerPrestamosPorLibro(libro_id);

      res.status(200).json({
        success: true,
        libro_id: libro_id,
        count: prestamos.length,
        data: prestamos
      });
    } catch (error) {
      console.error('Error al obtener préstamos por libro:', error);
      res.status(500).json({
        success: false,
        error: 'Error al obtener préstamos'
      });
    }
  };

  obtenerPrestamosPorUsuario = async (req, res) => {
    try {
      const usuario_id = parseInt(req.params.usuario_id);

      const prestamos = await this.service.obtenerPrestamosPorUsuario(usuario_id);

      res.status(200).json({
        success: true,
        usuario_id: usuario_id,
        count: prestamos.length,
        data: prestamos
      });
    } catch (error) {
      console.error('Error al obtener préstamos por usuario:', error);
      res.status(500).json({
        success: false,
        error: 'Error al obtener préstamos'
      });
    }
  };

  obtenerPrestamosActivos = async (req, res) => {
    try {
      const prestamos = await this.service.obtenerPrestamosActivos();

      res.status(200).json({
        success: true,
        count: prestamos.length,
        data: prestamos
      });
    } catch (error) {
      console.error('Error al obtener préstamos activos:', error);
      res.status(500).json({
        success: false,
        error: 'Error al obtener préstamos activos'
      });
    }
  };

  devolverPrestamo = async (req, res) => {
    try {
      const id = parseInt(req.params.id);

      const prestamoDevuelto = await this.service.devolverPrestamo(id);

      if (!prestamoDevuelto) {
        return res.status(404).json({
          success: false,
          error: `Préstamo con ID ${id} no encontrado`
        });
      }

      res.status(200).json({
        success: true,
        message: 'Préstamo devuelto exitosamente',
        data: prestamoDevuelto
      });
    } catch (error) {
      console.error('Error al devolver préstamo:', error);

      if (error.message.includes('ya está devuelto')) {
        return res.status(400).json({
          success: false,
          error: error.message
        });
      }

      res.status(400).json({
        success: false,
        error: error.message || 'Error al devolver préstamo'
      });
    }
  };

  actualizar = async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { estado } = req.body;


      if (!estado) {
        return res.status(400).json({
          success: false,
          error: 'El estado es requerido'
        });
      }

      // Validar que el estado sea correcto
      if (estado !== 'ACTIVO' && estado !== 'DEVUELTO') {
        return res.status(400).json({
          success: false,
          error: 'El estado debe ser "ACTIVO" o "DEVUELTO"'
        });
      }

      const prestamoActualizado = await this.service.actualizarEstado(id, {
        estado
      });

      if (!prestamoActualizado) {
        return res.status(404).json({
          success: false,
          error: `Préstamo con ID ${id} no encontrado`
        });
      }

      res.status(200).json({
        success: true,
        message: 'Préstamo actualizado exitosamente',
        data: prestamoActualizado
      });
    } catch (error) {
      console.error('Error al actualizar préstamo:', error);
      res.status(400).json({
        success: false,
        error: error.message || 'Error al actualizar préstamo'
      });
    }
  };
  //-------------------------------------------------------

  eliminar = async (req, res) => {
    try {
      const { id } = req.params;
      const prestamo = await this.service.eliminarPrestamo(id);
      res.status(200).json({ message: 'Prestamo eliminado exitosamente' });
    } catch (error) {
      console.error('Error al eliminar prestamo:', error);
      res.status(500).json({ error: 'Error al eliminar el prestamo' });
    }
  };
}