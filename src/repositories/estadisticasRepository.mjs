import { supabase } from '../config/database.mjs';
import { Prestamo } from '../models/Prestamo.mjs';
import redis from '../config/redis.mjs';

export class EstadisticasRepository {
  constructor() {
    this.redis = redis;
    this.ttl = 60;
  }

  async obtenerPrestamosActivos() {
    const clave = 'prestamos:activos:usuarios';
    
    if (this.redis && this.redis.isReady) {
      try {
        const cache = await this.redis.get(clave);
        if (cache) {
          await this.redis.expire(clave, this.ttl);
          return JSON.parse(cache);
        }
      } catch (error) {
        console.log('Error cache:', error.message);
      }
    }
    
    const { data, error } = await supabase
      .from('prestamos')
      .select(`
        *,
        usuarios (
          id,
          nombre_completo,
          email
        )
      `)
      .eq('estado', 'ACTIVO')
      .order('fecha_prestamo', { ascending: false });
    
    if (error) throw error;
    
    const resultado = data.map(item => ({
      id: item.id,
      libro_id: item.libro_id,
      usuario_id: item.usuario_id,
      usuario_nombre: item.usuarios?.nombre_completo,
      usuario_email: item.usuarios?.email,
      fecha_prestamo: item.fecha_prestamo,
      estado: item.estado,
      created_at: item.created_at,
      updated_at: item.updated_at
    }));
    
    if (this.redis && this.redis.isReady && resultado) {
      try {
        await this.redis.setex(clave, this.ttl, JSON.stringify(resultado));
      } catch (error) {
        console.log('Error guardando cache:', error.message);
      }
    }
    
    return resultado;
  }

  async obtenerGeneroLibros() {
    const clave = 'estadisticas:libros-por-genero';
    
    if (this.redis && this.redis.isReady) {
      try {
        const cache = await this.redis.get(clave);
        if (cache) {
          await this.redis.expire(clave, this.ttl);
          return JSON.parse(cache);
        }
      } catch (error) {
        console.log('Error cache:', error.message);
      }
    }
    
    const { data, error } = await supabase
      .from('libros_generos')
      .select(`
        genero_id,
        generos (
          nombre
        )
      `);
    
    if (error) throw error;
    
    const busqueda = {};
    
    data.forEach(p => {
      const nombreGenero = p.generos?.nombre;
      if (nombreGenero) {
        busqueda[nombreGenero] = (busqueda[nombreGenero] || 0) + 1;
      }
    });
    
    const resultado = Object.entries(conteo).map(([genero, total]) => ({
      genero,
      total
    })).sort((a, b) => b.total - a.total);
    
    if (this.redis && this.redis.isReady && resultado) {
      try {
        await this.redis.setex(clave, this.ttl, JSON.stringify(resultado));
      } catch (error) {
        console.log('Error guardando cache:', error.message);
      }
    }
    
    return resultado;
  }
}