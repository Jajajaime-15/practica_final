import { LibroService } from '../services/libroService.mjs';

export class LibroController {

  constructor() {
    this.service = new LibroService();
  }

  crear = async (req, res) => {
    try {
      const { titulo, autor_id, stock } = req.body;
      const libro = await this.service.crearLibro({
        titulo,
        autor_id,
        stock: stock || 1
      });

      res.status(201).json({
        message: 'Libro creado exitosamente',
        data: libro.toJSON()
      });
    } catch (error) {
      console.error('Error al crear libro:', error);
      res.status(400).json({ error: 'Error al crear un libro' });
    }
  };

  listar = async (req, res) => {
    try {
      const libros = await this.service.mostrarLibros();

      res.json({
        total: libros.length,
        libros: libros.map(l => l.toJSON())
      });
    } catch (error) {
      console.error('Error al listar libros:', error);
      res.status(500).json({ error: 'Error al listar libros' });
    }
  };

  obtener = async (req, res) => {
    try {
      const { id } = req.params;
      const libro = await this.service.buscarLibro(id);

      res.json({
        libro: libro
      });
    } catch (error) {
      console.error('Error al obtener libro:', error);
      res.status(500).json({ error: 'Error al obtener el libro por id' });
    }
  };

  actualizar = async (req, res) => {
    try {
      const { id } = req.params;
      const { stock } = req.body;
      const libroActualizado = await this.service.actualizarStock(id, stock);

      res.status(201).json({
        message: 'Stock del libro actualizado exitosamente',
        data: libroActualizado.toJSON()
      })
    } catch (error) {
      console.error('Error al actualizar libro:', error);
      res.status(400).json({ error: 'Error al actualizar libro' });
    }
  };

  eliminar = async (req, res) => {
    try {
      const { id } = req.params;
      const libro = await this.service.eliminarLibro(id);

      res.json({
        message: 'Libro eliminado exitosamente',
        data: libro.toJSON()
      });
    } catch (error) {
      console.error('Error al eliminar libro:', error);
      res.status(500).json({ error: 'Error al eliminar un libro' });
    }
  };
}