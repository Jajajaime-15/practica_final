import { param } from 'express/lib/application';
import { supabase } from '../config/database.mjs';
import { Autor } from '../models/Autor.mjs';

export class AutorRepository{

    // CREAR AUTOR EN BBDD
    async crear (data){
        const {data, error} = await supabase //peticion 'insert' a supabase
            .from ('autores')
            .insert([data])
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