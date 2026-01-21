import { supabase } from '../config/database.mjs';
import { Usuario } from '../models/Usuario.mjs';

export class UsuarioRepository{

    // CREAR USUARIO EN BBDD
    async crear (data){
        const {data, error} = await supabase //peticion 'insert' a supabase
            .from ('usuarios')
            .insert([data])
            .select()
            .single();

        if (error) throw error;
        return new Usuario(data); //convertimos los datos en un objeto Usuario y lo devolvemos
    }

    // BUSCAR-MOSTRAR UN USUARIO POR ID
    async buscarPorId(id) {
        const { data, error } = await supabase //peticion 'select' a supabase con condicion (solo queremos un usuario)
            .from('ausuarios')
            .select('*')
            .eq('id', id) //condicion: id indicado coincide con un id de la tabla
            .single();

        if (error) return null;
        return data ? new Libro(data) : null; //los datos encontrados los convertimos en objeto Usuario, si no hay datos = 'null'
    }

    // BUSCAR-MOSTRAR TODOS LOS USUARIOS
    async buscarTodos() {
        const { data, error } = await supabase //peticion 'select' a supabase sin condicion (queremos todos los libros)
            .from('usuarios')
            .select('*')
            .order('nombre_completo', { ascending: true }); //los libros los mostramos ordenados alfabeticamente

        if (error) throw error;
        return data.map(item => new Libro(item)); //convertimos cada registro del array en objeto Libro
    }

    // ACTUALIZAR EMAIL DE UN USUARIO
    async actualizarEmail(id,cambios){
        const {data,error} = await supabase //peticion 'update' a supabase
            .from('usuarios')
            .update('cambios') //actualizamos los datos
            .eq('id',id)
            .single();
        
        if (error) throw error;
        return new Usuario(data)
    }


    // ELIMINAR UN USUARIO POR ID DE LA BBDD
    async eliminar(id) {
        const { error } = await supabase //peticion 'delete' a supabase
            .from('usuarios')
            .delete()
            .eq('id', id); //condicion: id indicado coincide con un id de la tabla

        if (error) throw error;
        return true;
    }
}