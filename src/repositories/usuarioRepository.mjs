import { supabase } from '../config/database.mjs';
import { Usuario } from '../models/Usuario.mjs';

export class UsuarioRepository{

    // CREAR USUARIO EN BBDD
    async crear (usuarioData){
        const { data, error } = await supabase // peticion 'insert' a supabase
            .from ('usuarios')
            .insert([usuarioData])
            .select()
            .single();

        if (error) throw error;
        return new Usuario(data); // convertimos los datos en un objeto Usuario y lo devolvemos
    }

    // BUSCAR-MOSTRAR UN USUARIO POR ID
    async buscarPorId(id) {
        const { data, error } = await supabase // peticion 'select' a supabase con condicion (solo queremos un usuario)
            .from('usuarios')
            .select('*')
            .eq('id', id) // condicion: id indicado coincide con un id de la tabla
            .single();

        if (error) return error;
        return data ? new Usuario(data) : null; // los datos encontrados los convertimos en objeto Usuario, si no hay datos = 'null'
    }

    // BUSCAR-MOSTRAR TODOS LOS USUARIOS
    async buscarTodos() {
        const { data, error } = await supabase // peticion 'select' a supabase sin condicion (queremos todos los usuarios)
            .from('usuarios')
            .select('*')
            .order('nombre_completo', { ascending: true }); // los usuarios los mostramos ordenados alfabeticamente

        if (error) throw error;
        return data.map(item => new Usuario(item)); // convertimos cada registro del array en objeto Usuario
    }

    // ACTUALIZAR DATOS DE UN USUARIO
    async actualizarEmail(id, nuevoEmail){
        const { data, error } = await supabase // peticion 'update' a supabase
            .from('usuarios')
            .update({email: nuevoEmail}) // indicamos el campo que actualizamos
            .eq('id', id)
            .select()
            .single();
        
        if (error) throw error;
        return new Usuario(data)
    }
    
    // ELIMINAR UN USUARIO POR ID DE LA BBDD
    async eliminar(id) {
        const { error } = await supabase // peticion 'delete' a supabase
            .from('usuarios')
            .delete()
            .eq('id', id); // condicion: id indicado coincide con un id de la tabla

        if (error) throw error;
        return true;
    }
}