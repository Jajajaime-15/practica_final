import { LibroService } from '../services/libroService.mjs';

export class LibroController {

  constructor() {
    this.service = new LibroService;
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
        id: libro.id,
        titulo: libro.titulo
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
      console.error('Error al obtener libros:', error);
      res.status(500).json({ error: 'Error al obtener libros' });
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

  //-----------REVISAR--------------------
  actualizar = async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { stock } = req.body;

      // Solo permitimos actualizar stock
      if (stock === undefined) {
        return res.status(400).json({
          success: false,
          error: 'El stock es requerido'
        });
      }
      const libroActualizado = await this.service.actualizarStock(id, stock);
    } catch (error) {
      console.error('Error al actualizar libro:', error);
      res.status(400).json({
        success: false,
        error: error.message || 'Error al actualizar libro'
      });
    }
  };
  //----------------------------------

  eliminar = async (req, res) => {
    try {
      const { id } = req.params;
      const libro = await this.service.eliminarLibro(id);

      res.json({ message: 'Libro eliminado exitosamente' });
    } catch (error) {
      console.error('Error al eliminar libro:', error);
      res.status(500).json({ error: 'Error al eliminar un libro' });
    }
  };

}