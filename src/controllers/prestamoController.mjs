import { PrestamoService } from '../services/prestamoService.mjs';

export class PrestamoController{

    constructor(prestamoService) {
        this.service = prestamoService;
    }

    listar = async (req, res) => {
    try {
      const prestamos = await this.service.listar();
      
      res.status(200).json({
        success: true,
        count: prestamos.length,
        data: prestamos
      });
    } catch (error) {
      console.error('Error al obtener préstamos:', error);
      res.status(500).json({ 
        success: false,
        error: 'Error al obtener préstamos'
      });
    }
  };

  obtener= async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      
      const prestamo = await this.service.obtener(id);
      
      if (!prestamo) {
        return res.status(404).json({
          success: false,
          error: `Préstamo con ID ${id} no encontrado`
        });
      }
      
      res.status(200).json({
        success: true,
        data: prestamo
      });
    } catch (error) {
      console.error('Error al obtener préstamo:', error);
      res.status(500).json({ 
        success: false,
        error: 'Error al obtener préstamo'
      });
    }
  };

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

  crear = async (req, res) => {
    try {
      const { libro_id, usuario_id } = req.body;
      
      
      if (!libro_id) {
        return res.status(400).json({
          success: false,
          error: 'El libro es requerido'
        });
      }
      
      if (!usuario_id) {
        return res.status(400).json({
          success: false,
          error: 'El usuario es requerido'
        });
      }
      
      const nuevoPrestamo = await this.service.crear({
        libro_id,
        usuario_id
      });
      
      res.status(201).json({
        success: true,
        message: 'Préstamo creado exitosamente',
        data: nuevoPrestamo
      });
    } catch (error) {
      console.error('Error al crear préstamo:', error);
      
      
      if (error.message.includes('stock insuficiente')) {
        return res.status(400).json({
          success: false,
          error: error.message
        });
      }
      
      res.status(400).json({ 
        success: false,
        error: error.message || 'Error al crear préstamo'
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

  eliminar = async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      
      const resultado = await this.service.eliminar(id);
      
      if (!resultado) {
        return res.status(404).json({
          success: false,
          error: `Préstamo con ID ${id} no encontrado`
        });
      }
      
      res.status(200).json({
        success: true,
        message: 'Préstamo eliminado exitosamente',
        data: { id: id }
      });
    } catch (error) {
      console.error('Error al eliminar préstamo:', error);
      res.status(500).json({ 
        success: false,
        error: 'Error al eliminar préstamo'
      });
    }
  };

}