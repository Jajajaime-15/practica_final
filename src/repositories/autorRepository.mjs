import { supabase } from '../config/database.mjs';
import { Autor } from '../models/Autor.mjs';
import redis from '../config/redis.mjs';

export class AutorRepository {
  constructor(){
    this.redis = redis
    this.TTL = 60
    this.CACHE_KEY = 'autores:lista' // convencion de nombres de redis, significa que almacena el listado de autores
  }

  // CREAR AUTOR EN BBDD
  async crear(autorData) {
    const { data, error } = await supabase //peticion 'insert' a supabase
      .from('autores')
      .insert([autorData])
      .select()
      .single();

    if (error) throw error;
    try{ // en caso de que se cree una nueva instancia en la bbdd ya no nos servira lo guardado en cache, por lo que realizamos la invalidacion de cache
      if (this.redis){
        await this.redis.del(this.CACHE_KEY)
      }
    }catch(error){
      console.log("Error al realizar la invalidacion de cache: ", error)
    }

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
    try{ // primero comprobamos si se puede leer del cache, ya que esta es una consulta frecuente que permitimos almacenar
      if (this.redis){
        const cached = await this.redis.get(this.CACHE_KEY)
        if (cached){
          console.log('Lista de autores obtenida del cache')
          await this.redis.expire(this.CACHE_KEY, this.TTL) // hacemos que se renueve el ttl cada vez que se acceda, para mantener la frecuencia
          return JSON.parse(cached).map(item => new Autor(item)) // convertimos los strings de redis en objetos y luego en instancias de la clase
        }
      }
    }catch(error){
      console.log("Error al leer cache: ", error)
    }

    console.log('Los autores han sido obtenidos de la base de datos') // en caso de no estar en el cache procedemos como siempre, accediendo a la base de datos
    const { data, error } = await supabase //peticion 'select' a supabase sin condicion (queremos todos los autores)
      .from('autores')
      .select('*')
      .order('nombre_completo', { ascending: true }); //los autores los mostramos ordenados alfabeticamente

    if (error) throw error;

    try{ // si se ha consultado de la base de datos, guardamos en cache para poder acceder de esta manera en las proximas consultas
      if (this.redis && data){
        await this.redis.setEx(this.CACHE_KEY, this.TTL, JSON.stringify(data)) // asignamos la clave donde guardamos los datos, el tiempo que duraran y los datos obtenidos de la bbdd
        console.log('La lista de autores ha sido guardada en cache')
      }
    }catch(error){
      console.log('Error al guardar en cache: ', error)
    }

    return data.map(item => new Autor(item)); //convertimos cada registro del array en objeto Autor
  }

  // ELIMINAR UN AUTOR POR ID DE LA BBDD
  async eliminar(id) {
    const { error } = await supabase //peticion 'delete' a supabase
      .from('autores')
      .delete()
      .eq('id', id); //condicion: id indicado coincide con un id de la tabla

    if (error) throw error;

    try{ // en caso de que se elimine una instancia en la bbdd ya no nos servira lo guardado en cache, por lo que realizamos la invalidacion de cache
      if (this.redis){
        await this.redis.del(this.CACHE_KEY)
      }
    }catch(error){
      console.log("Error al realizar la invalidacion de cache: ", error)
    }

    return true;
  }
}