import { supabase } from '../config/database.mjs';
import { Autor } from '../models/Autor.mjs';
import redis from '../config/redis.mjs';

export class AutorRepository{

    constructor() {
    
    this.r = redis;
    this.TTL = 60; // Tiempo de caché en segundos
  }
    async obtenerAutores() {
    const key = 'autores:lista';
    
    let autoresCache = null;
    try {
      if (this.r) {
        autoresCache = await this.r.get(key);
        if (autoresCache) {
          await this.r.expire(key, this.TTL); // Renovar TTL
        }
      }
    } catch (error) {
      console.log('Error al acceder a la cache:', error.message);
    }
    
    if (autoresCache) {
      console.log('Autores encontrados en la cache');
      return JSON.parse(autoresCache).map(item => new Autor(item));
    }
    
    // Si no está en cache asi que buscamos en la base de datos
    console.log('Autores no encnontrados en cache, consultando base de datos');
    
    try {
      const { data, error } = await supabase
        .from('autores')
        .select('*')
        .order('nombre_completo', { ascending: true });
      
      if (error) {
        console.error('Error consultando en la base de datos:', error.message);
        throw new Error(`Error al obtener autores: ${error.message}`);
      }
      
      if (!data || data.length === 0) {
        console.log(' No hay autores en la base de datos');
        return [];
      }
      
      console.log(`${data.length} autores obtenidos de la base de datos`);
      
      // Guardamos los datos en cache para proximas consultas
      try {
        if (this.r) {
          await this.r.setex(key, this.TTL, JSON.stringify(data));
          console.log(' Autores guardados en caché');
        }
      } catch (error) {
        console.log('Error guardando en cache:', error.message);
      }
      
      // Convertir a objetos Libro
      return data.map(item => new Autor(item));
      
    } catch (error) {
      console.error('Error al obtener autores', error);
      throw error;
    }
  }

    // CREAR AUTOR EN BBDD
    async crear (autorData){
        const {data, error} = await supabase //peticion 'insert' a supabase
            .from ('autores')
            .insert([autorData])
            .select()
            .single();

        if (error) throw error;
        return new Autor(data); //convertimos los datos en un objeto Autor y lo devolvemos
    }

    // BUSCAR-MOSTRAR UN AUTOR POR ID
    async buscarPorId(id) {
        const { data, error } = await supabase //peticion 'select' a supabase con condicion (solo queremos un autor)
            .from('autores')
            .select('*')
            .eq('id', id) //condicion: id indicado coincide con un id de la tabla
            .single();

        if (error) return null;
        return data ? new Autor(data) : null; //los datos encontrados los convertimos en objeto Autor, si no hay datos = 'null'
    }

    // BUSCAR-MOSTRAR TODOS LOS AUTORES
    async buscarTodos() {
        const { data, error } = await supabase //peticion 'select' a supabase sin condicion (queremos todos los autores)
            .from('autores')
            .select('*')
            .order('nombre_completo', { ascending: true }); //los autores los mostramos ordenados alfabeticamente

        if (error) throw error;
        return data.map(item => new Autor(item)); //convertimos cada registro del array en objeto Autor
    }

    // ELIMINAR UN AUTOR POR ID DE LA BBDD
    async eliminar(id) {
        const { error } = await supabase //peticion 'delete' a supabase
            .from('autores')
            .delete()
            .eq('id', id); //condicion: id indicado coincide con un id de la tabla

        if (error) throw error;
        return true;
  }

  
    }


