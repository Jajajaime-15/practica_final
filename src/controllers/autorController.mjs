import { AutorService } from '../services/autorService.mjs';

export class AutorController {

  constructor() {
    this.service = new AutorService();
  }

  crear = async (req, res) => {
    try {
      const { nombre_completo } = req.body;
      const autor = await this.service.crearAutor(nombre_completo.trim());

      res.status(201).json({
        message: 'Autor creado exitosamente',
        data: autor.toJSON()
      });
    } catch (error) {
      console.error('Error al crear autor:', error);
      res.status(400).json({ error: 'Error al crear un autor' });
    }
  };

  listar = async (req, res) => {
    try {
      const autores = await this.service.mostrarAutores();

      res.json({
        total: autores.length,
        autores: autores.map(a => a.toJSON())
      });

    } catch (error) {
      console.error('Error al obtener autores:', error);
      res.status(500).json({ error: 'Error al obtener autores' });
    }
  };

  obtener = async (req, res) => {
    try {
      const { id } = req.params;
      const autor = await this.service.buscarAutor(id);

      res.json({
        autor: autor
      });
    } catch (error) {
      console.error('Error al obtener el autor por id:', error);
      res.status(500).json({ error: 'Error al obtener el autor por id' });
    }
  };

  eliminar = async (req, res) => {
    try {
      const { id } = req.params;
      const autor = await this.service.eliminarAutor(id);

      res.json({
        message: 'Autor eliminado exitosamente',
        data: autor.toJSON()
      });
    } catch (error) {
      console.error('Error al eliminar un autor:', error);
      res.status(400).json({ error: 'Error al eliminar un autor' })
    }
  };
}