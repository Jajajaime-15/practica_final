import express from 'express';
import apiKeyRoutes from './apiKeyRoutes.mjs';
import autorRoutes from './autorRoutes.mjs';
import libroRoutes from './libroRoutes.mjs';
import prestamoRoutes from './prestamoRoutes.mjs';
import usuarioRoutes from './usuarioRoutes.mjs';
import generoRoutes from './generoRoutes.mjs';
import estadisticasRoutes from './estadisticasRoutes.mjs';

const router = express.Router();

router.use('/libros', libroRoutes);
router.use('/autores', autorRoutes);
router.use('/prestamos', prestamoRoutes);
router.use('/usuarios', usuarioRoutes);
router.use('/generos', generoRoutes);
router.use('/estadisticas', estadisticasRoutes);

// Montar las rutas de API Keys
router.use('/', apiKeyRoutes);

// Ruta raíz con información de la API
router.get('/', (req, res) => {
  res.json({
    name: 'API con autenticación por API Key',
    version: '1.0.0',
    endpoints: {
      public: [
        'POST /api/register - Registrar y obtener nueva API Key'
      ],
      protected: [
        'GET /api/protected/data - Datos protegidos (requiere API Key)',
        'GET /api/protected/me - Info del cliente (requiere API Key)'
      ],
      admin: [
        'GET /api/admin/keys - Listar todas las API Keys (requiere ser admin)',
        'PUT /api/admin/keys/:apiKey/deactivate - Desactivar API Key (requiere ser admin)',
        'PUT /api/admin/keys/:apiKey/activate - Activar API Key (requiere ser admin)'
      ],
      libros: [
        'POST /api/libros - Crear un nuevo libro (requiere ser admin)',
        'GET /api/libros - Obtener una lista completa de todos los libros de la biblioteca',
        'GET /api/libros/:id - Obtener un libro concreto de la base de datos mediante su id (requiere API Key)',
        'PUT /api/libros/:id - Actualizar un libro en la base de datos (requiere ser admin)',
        'DELETE /api/libros/:id - Eliminar un libro de la base de datos (requiere ser admin)'
      ],
      autores: [
        'POST /api/autores - Crear un nuevo autor (requiere ser admin)',
        'GET /api/autores - Obtener una lista completa de todos los autores de la base de datos',
        'GET /api/autores/:id - Obtener un autor concreto de la base de datos mediante su id (requiere API Key)',
        'PUT /api/autores/:id - Actualizar un autor en la base de datos (requiere ser admin)',
        'DELETE /api/autores/:id - Eliminar un autor de la base de datos (requiere ser admin)'
      ],
      usuarios: [
        'POST /api/usuarios - Crear un nuevo usuario (requiere ser admin)',
        'GET /api/usuarios - Obtener una lista completa de todos los usuarios de la base de datos (requiere ser admin)',
        'GET /api/usuarios/:id - Obtener un usuario concreto de la base de datos mediante su id (requiere ser admin)',
        'PUT /api/usuarios/:id - Actualizar un usuario en la base de datos (requiere ser admin)',
        'DELETE /api/usuarios/:id - Eliminar un usuario de la base de datos (requiere ser admin)'
      ],
      prestamos: [
        'POST /api/prestamos - Crear un nuevo prestamo (requiere ser admin)',
        'GET /api/prestamos - Obtener una lista completa de todos los prestamos de la base de datos (requiere ser admin)',
        'GET /api/prestamos/:id - Obtener un prestamo concreto de la base de datos mediante su id (requiere ser admin)',
        'PUT /api/prestamos/:id - Actualizar un prestamo en la base de datos (requiere ser admin)',
        'DELETE /api/prestamos/:id - Eliminar un prestamo de la base de datos (requiere ser admin)'
      ],
      generos: [
        'POST /api/generos - Crear un nuevo genero (requiere ser admin)',
        'GET /api/generos - Obtener una lista completa de todos los generos de la base de datos',
        'GET /api/generos/:id - Obtener un genero concreto de la base de datos mediante su id (requiere API Key)',
        'DELETE /api/generos/:id - Eliminar un genero de la base de datos (requiere ser admin)'
      ],
      estadisticas: [
        'GET /api/estadisticas/ - Primera consulta avanzada - (requiere API Key)',
        'GET /api/estadisticas - Segunda consulta avanzada - (requiere API Key)',
      ]
    },
    usage: {
      header: 'X-API-Key',
      example: 'X-API-Key: tu-uuid-aqui'
    }
  });
});

export default router;