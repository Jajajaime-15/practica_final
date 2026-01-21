import { UsuarioService } from '../services/usuarioService.mjs';

export class UsuarioController{

    constructor(usuarioService) {
    this.service = usuarioService;
  }

  listar = async (req, res) => {
    try {
      const usuarios = await this.service.listar();
      
      res.status(200).json({
        success: true,
        count: usuarios.length,
        data: usuarios
      });
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      res.status(500).json({ 
        success: false,
        error: 'Error al obtener usuarios'
      });
    }
  };

  obtener = async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      
      const usuario = await this.service.obtener(id);
      
      if (!usuario) {
        return res.status(404).json({
          success: false,
          error: `Usuario con ID ${id} no encontrado`
        });
      }
      
      res.status(200).json({
        success: true,
        data: usuario
      });
    } catch (error) {
      console.error('Error al obtener usuario:', error);
      res.status(500).json({ 
        success: false,
        error: 'Error al obtener usuario'
      });
    }
  };

  crear = async (req, res) => {
    try {
      const { nombre_completo, email } = req.body;
      
      // Validación
      if (!nombre_completo) {
        return res.status(400).json({
          success: false,
          error: 'El nombre es requerido'
        });
      }
      
      if (!email) {
        return res.status(400).json({
          success: false,
          error: 'El email es requerido'
        });
      }
      
      const nuevoUsuario = await this.service.crearUsuario({
        nombre_completo,
        email
      });
      
      res.status(201).json({
        success: true,
        message: 'Usuario creado exitosamente',
        data: nuevoUsuario
      });
    } catch (error) {
      console.error('Error al crear usuario:', error);
      
      // Manejar error de email duplicado
      if (error.message.includes('duplicate key') || error.message.includes('ya existe')) {
        return res.status(409).json({
          success: false,
          error: 'El email ya está registrado'
        });
      }
      
      res.status(400).json({ 
        success: false,
        error: error.message || 'Error al crear usuario'
      });
    }
  };

  actualizar = async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { nombre_completo, email } = req.body;
      
      const usuarioActualizado = await this.service.actualizar(id, {
        nombre_completo,
        email
      });
      
      if (!usuarioActualizado) {
        return res.status(404).json({
          success: false,
          error: `Usuario con ID ${id} no encontrado`
        });
      }
      
      res.status(200).json({
        success: true,
        message: 'Usuario actualizado exitosamente',
        data: usuarioActualizado
      });
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
      const id = parseInt(req.params.id);
      
      const resultado = await this.service.eliminar(id);
      
      if (!resultado) {
        return res.status(404).json({
          success: false,
          error: `Usuario con ID ${id} no encontrado`
        });
      }
      
      res.status(200).json({
        success: true,
        message: 'Usuario eliminado exitosamente',
        data: { id: id }
      });
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      
      // Manejar error si tiene préstamos activos
      if (error.message.includes('tiene préstamos activos')) {
        return res.status(409).json({
          success: false,
          error: error.message
        });
      }
      
      res.status(500).json({ 
        success: false,
        error: 'Error al eliminar usuario'
      });
    }
  };

}