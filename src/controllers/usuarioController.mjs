import { UsuarioService } from '../services/usuarioService.mjs';

export class UsuarioController {
  constructor(usuarioService) {
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
      res.status(400).json({ error: 'Error al crear un usuario' });
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
      res.status(500).json({ error: 'Error al obtener usuarios' });
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
      res.status(500).json({ error: 'Error al obtener usuario' });
    }
  };

  actualizar = async (req, res) => {
    try {
      const {id} = req.params;
      const { email } = req.body;

      // Solo permitimos actualizar email
      if (!email) {
        return res.status(400).json({
          success: false,
          error: 'El email es requerido'
        });
      }
      const usuarioActualizado = await this.service.actualizarEmail(id, email);
    } catch (error) {
      console.error('Error al actualizar usuario:', error);

      if (error.message.includes('duplicate key') || error.message.includes('ya existe')) {
        return res.status(409).json({
          success: false,
          error: 'El email ya está registrado por otro usuario'
        });
      }

      res.status(400).json({
        success: false,
        error: error.message || 'Error al actualizar usuario'
      });
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
      return res.status(409).json({ error: 'Error al eliminar un genero' });
    }
  }
}
