import { AutorService } from '../services/autorService.mjs';

export class AutorController{

    constructor() {
        this.service = new AutorService();
    }

    listar = async (req, res) => {
    try {
      const autores = await this.service.listar();
      
      res.status(200).json({
        success: true,
        count: autores.length,
        data: autores
      });
    } catch (error) {
      console.error('Error al obtener autores:', error);
      res.status(500).json({ 
        success: false,
        error: 'Error al obtener autores'
      });
    }
  };

  obtener = async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          error: 'ID debe ser un número válido'
        });
      }
      
      const autor = await this.service.obtener(id);
      
      if (!autor) {
        return res.status(404).json({
          success: false,
          error: `Autor con ID ${id} no encontrado`
        });
      }
      
      res.status(200).json({
        success: true,
        data: autor
      });
    } catch (error) {
      console.error('Error al obtener autor:', error);
      res.status(500).json({ 
        success: false,
        error: 'Error al obtener autor'
      });
    }
  };

  crear = async (req, res) => {
    try {
      const { nombre_completo } = req.body;
      
      // Validación básica
      if (!nombre_completo || nombre_completo.trim() === '') {
        return res.status(400).json({
          success: false,
          error: 'El nombre del autor no puede estar vacio'
        });
      }
      
      const nuevoAutor = await this.service.crear(nombre_completo.trim());
      
      res.status(201).json({
        success: true,
        message: 'Autor creado exitosamente',
        data: nuevoAutor
      });
    } catch (error) {
      console.error('Error al crear autor:', error);
      
      // Manejar errores específicos
      if (error.message.includes('ya existe')) {
        return res.status(409).json({
          success: false,
          error: error.message
        });
      }
      
      res.status(400).json({ 
        success: false,
        error: error.message || 'Error al crear autor'
      });
    }
  };

  actualizar = async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { nombre_completo } = req.body;
      
      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          error: 'ID debe ser un número válido'
        });
      }
      
      if (!nombre_completo || nombre_completo.trim() === '') {
        return res.status(400).json({
          success: false,
          error: 'El nombre del autor no puede estar vacio'
        });
      }
      
      const autorActualizado = await this.service.actualizar(id, nombre_completo.trim());
      
      if (!autorActualizado) {
        return res.status(404).json({
          success: false,
          error: `Autor con ID ${id} no encontrado`
        });
      }
      
      res.status(200).json({
        success: true,
        message: 'Autor actualizado exitosamente',
        data: autorActualizado
      });
    } catch (error) {
      console.error('Error al actualizar autor:', error);
      res.status(400).json({ 
        success: false,
        error: error.message || 'Error al actualizar autor'
      });
    }
  };

  borrar = async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          error: 'ID debe ser un número válido'
        });
      }
      
      const resultado = await this.service.borrar(id);
      
      if (!resultado) {
        return res.status(404).json({
          success: false,
          error: `Autor con ID ${id} no encontrado`
        });
      }
      
      res.status(200).json({
        success: true,
        message: 'Autor eliminado exitosamente',
        data: { id: id }
      });
    } catch (error) {
      console.error('Error al borrar autor:', error);
      
      // Manejar error si tiene libros asociados
      if (error.message.includes('tiene libros asociados')) {
        return res.status(409).json({
          success: false,
          error: error.message
        });
      }
      
      res.status(500).json({ 
        success: false,
        error: 'Error al eliminar autor'
      });
    }
  };

}