import { UsuarioService } from '../services/usuarioService.mjs';

export class UsuarioController {
  constructor() {
    this.service = new UsuarioService;
  }

  crear = async (req, res) => {
    try {
      const { nombre_completo, email } = req.body;
      const usuario = await this.service.crearUsuario(nombre_completo, email)

      res.status(201).json({
        message: 'Usuario creado exitosamente',
        data: usuario.toJSON()
      });
    } catch (error) {
      console.error('Error al crear usuario:', error);
      res.status(400).json({error: 'Error al crear un usuario' });
    }
  }

  listar = async (req, res) => {
    try {
      const usuarios = await this.service.mostrarUsuarios();

      res.json({
        total: usuarios.length,
        usuarios: usuarios.map(u => u.toJSON())
      });
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      res.status(500).json({error: 'Error al obtener usuarios' });
    }
  };

  obtener = async (req, res) => {
    try {
      const { id } = req.params;
      const usuario = await this.service.buscarUsuario(id);

      res.json({
        usuario: usuario
      });
    } catch (error) {
      console.error('Error al obtener usuario:', error);
      res.status(500).json({error: 'Error al obtener usuario' });
    }
  };

  actualizar = async (req, res) => {
    try {
      const { id } = req.params;
      const { email } = req.body;
      
      const usuarioActualizado = await this.service.actualizarEmail(id, email);

      res.status(201).json({
        message: 'Email del usuario actualizado exitosamente',
        data: usuarioActualizado.toJSON()
      });
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      res.status(400).json({error: 'Error al actualizar el email del usuario'});
    }
  };

  eliminar = async (req, res) => {
    try {
      const { id } = req.params;
      const usuario = await this.service.eliminarUsuario(id);

      res.json({
        message: 'Usuario eliminado exitosamente',
        data: usuario.toJSON()
      });
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      res.status(400).json({error: 'Error al eliminar un usuario'});
    }
  }
}
