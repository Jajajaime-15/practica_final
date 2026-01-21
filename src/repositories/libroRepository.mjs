import { supabase } from '../config/database.mjs';
import { Libro } from '../models/Libro.mjs';

export class LibroRepository{

    // CREAR LIBRO EN BBDD
    async crear (data){
        const {data, error} = await supabase //peticion 'insert' a supabase
            .from ('libros')
            .insert([data])
            .select()
            .single();

        if (error) throw error;
        return new Libro(data); //convertimos los datos en un objeto Libro y lo devolvemos
    }

    // BUSCAR-MOSTRAR UN LIBRO POR ID
    async buscarPorId(id) {
        const { data, error } = await supabase //peticion 'select' a supabase con condicion (solo queremos un libro)
            .from('libros')
            .select('*', autores (nombre_completo)) //join con la tabla de autores para coger el nombre del autor del libro
            .eq('id', id) //condicion: id indicado coincide con un id de la tabla
            .single();

        if (error) return null;
        return data ? new Libro(data) : null; //los datos encontrados los convertimos en objeto Libro, si no hay datos = 'null'
    }

    // BUSCAR-MOSTRAR TODOS LOS LIBROS
    async buscarTodos() {
        const { data, error } = await supabase //peticion 'select' a supabase sin condicion (queremos todos los libros)
            .from('libros')
            .select('*', autores (nombre_completo))
            .order('titulo', { ascending: true }); //los libros los mostramos ordenados alfabeticamente

        if (error) throw error;
        return data.map(item => new Libro(item)); //convertimos cada registro del array en objeto Libro
    }

    // ACTUALIZAR STOCK DE UN LIBRO
    async actualizarStock(id,nuevoStock){
        const {data,error} = await supabase //peticion 'update' a supabase
            .from('libros')
            .update({stock:nuevoStock}) //indicamos el campo que actualizamos
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