import { LibroService } from '../services/libroService.mjs';

export class LibroController{

    constructor(libroService) {
        this.service = libroService;
    }

    listar = async (req, res) => {
    try {
      const libros = await this.service.listar();
      
      res.status(200).json({
        success: true,
        count: libros.length,
        data: libros
      });
    } catch (error) {
      console.error('Error al obtener libros:', error);
      res.status(500).json({ 
        success: false,
        error: 'Error al obtener libros'
      });
    }
  };

  obtener = async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      
      const libro = await this.service.obtener(id);
      
      if (!libro) {
        return res.status(404).json({
          success: false,
          error: `Libro con ID ${id} no encontrado`
        });
      }
      
      res.status(200).json({
        success: true,
        data: libro
      });
    } catch (error) {
      console.error('Error al obtener libro:', error);
      res.status(500).json({ 
        success: false,
        error: 'Error al obtener libro'
      });
    }
  };

  crear = async (req, res) => {
    try {
      const { titulo, autor_id, stock } = req.body;
      
      // Validación muy básica
      if (!titulo) {
        return res.status(400).json({
          success: false,
          error: 'El título es necesario'
        });
      }
      
      if (!autor_id) {
        return res.status(400).json({
          success: false,
          error: 'El autor es necesario'
        });
      }
      
      const nuevoLibro = await this.service.crear({
        titulo,
        autor_id,
        stock: stock || 1
      });
      
      res.status(201).json({
        success: true,
        message: 'Libro creado exitosamente',
        data: nuevoLibro
      });
    } catch (error) {
      console.error('Error al crear libro:', error);
      res.status(400).json({ 
        success: false,
        error: error.message || 'Error al crear libro'
      });
    }
  };

  actualizar = async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { titulo, autor_id, stock } = req.body;
      
      const libroActualizado = await this.service.actualizar(id, {
        titulo,
        autor_id,
        stock
      });
      
      if (!libroActualizado) {
        return res.status(404).json({
          success: false,
          error: `Libro con ID ${id} no encontrado`
        });
      }
      
      res.status(200).json({
        success: true,
        message: 'Libro actualizado exitosamente',
        data: libroActualizado
      });
    } catch (error) {
      console.error('Error al actualizar libro:', error);
      res.status(400).json({ 
        success: false,
        error: error.message || 'Error al actualizar libro'
      });
    }
  };

  eliminar= async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      
      const resultado = await this.service.eliminar(id);
      
      if (!resultado) {
        return res.status(404).json({
          success: false,
          error: `Libro con ID ${id} no encontrado`
        });
      }
      
      res.status(200).json({
        success: true,
        message: 'Libro eliminado exitosamente',
        data: { id: id }
      });
    } catch (error) {
      console.error('Error al eliminar libro:', error);
      res.status(500).json({ 
        success: false,
        error: 'Error al eliminar libro'
      });
    }
  };

}