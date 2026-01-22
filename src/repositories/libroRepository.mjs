import { supabase } from '../config/database.mjs';
import { Libro } from '../models/Libro.mjs';
import redis from '../config/redis.mjs';

export class LibroRepository{
    constructor() {
    
    this.r = redis;
    this.TTL = 60; // Tiempo de caché en segundos
  }
    async obtenerLibros() {
    const key = 'libros:lista';
    
    let librosCache = null;
    try {
      if (this.r) {
        librosCache = await this.r.get(key);
        if (librosCache) {
          await this.r.expire(key, this.TTL); // Renovar TTL
        }
      }
    } catch (error) {
      console.log('Error al acceder a la cache:', error.message);
    }
    
    if (librosCache) {
      console.log('Libros encontrados en la cache');
      return JSON.parse(librosCache).map(item => new Libro(item));
    }
    
    // Si no está en cache asi que buscamos en la base de datos
    console.log('Libros no encontrados en cache, consultando base de datos');
    
    try {
      const { data, error } = await supabase
        .from('libros')
        .select('*')
        .order('titulo', { ascending: true });
      
      if (error) {
        console.error('Error consultando en la base de datos:', error.message);
        throw new Error(`Error al obtener libros: ${error.message}`);
      }
      
      if (!data || data.length === 0) {
        console.log(' No hay libros en la base de datos');
        return [];
      }
      
      console.log(`${data.length} libros obtenidos de la base de datos`);
      
      // Guardamos los datos en cache para proximas consultas
      try {
        if (this.r) {
          await this.r.set(key, JSON.stringify(data), { EX: this.TTL });
          console.log(' Libros guardados en caché');
        }
      } catch (error) {
        console.log('Error guardando en cache:', error.message);
      }
      
      // Convertir a objetos Libro
      return data.map(item => new Libro(item));
      
    } catch (error) {
      console.error('Error al obtener libros', error);
      throw error;
    }
  }


    // CREAR LIBRO EN BBDD
    async crear (libroData){
        const {data, error} = await supabase //peticion 'insert' a supabase
            .from ('libros')
            .insert([libroData])
            .select()
            .single();

        if (error) throw error;
        return new Libro(data); //convertimos los datos en un objeto Libro y lo devolvemos
    }

    // BUSCAR-MOSTRAR UN LIBRO POR ID
    async buscarPorId(id) {
        const { data, error } = await supabase //peticion 'select' a supabase con condicion (solo queremos un libro)
            .from('libros')
            .select('*') 
            .eq('id', id) //condicion: id indicado coincide con un id de la tabla
            .single();

        if (error) return null;
        return data ? new Libro(data) : null; // los datos encontrados los convertimos en objeto Libro, si no hay datos = 'null'
    }

    // BUSCAR-MOSTRAR TODOS LOS LIBROS
    async buscarTodos() {
        const { data, error } = await supabase //peticion 'select' a supabase sin condicion (queremos todos los libros)
            .from('libros')
            .select('*')
            .order('titulo', { ascending: true }); //los libros los mostramos ordenados alfabeticamente

        if (error) throw error;
        return data.map(item => new Libro(item)); //convertimos cada registro del array en objeto Libro
    }

    // ACTUALIZAR STOCK DE UN LIBRO
    async actualizarStock(id, nuevoStock){
        const {data,error} = await supabase // peticion 'update' a supabase
            .from('libros')
            .update({stock: nuevoStock}) // indicamos el campo que actualizamos
            .eq('id',id)
            .select()
            .single();
        
        if (error) throw error;
        return new Libro(data);
    }

    // ELIMINAR UN LIBRO POR ID DE LA BBDD
    async eliminar(id) {
        const { error } = await supabase //peticion 'delete' a supabase
            .from('libros')
            .delete()
            .eq('id', id); //condicion: id indicado coincide con un id de la tabla

        if (error) throw error;
        return true;
    }
}