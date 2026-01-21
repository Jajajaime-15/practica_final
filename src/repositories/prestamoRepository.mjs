import { supabase } from '../config/database.mjs';
import { Prestamo } from '../models/Prestamo.mjs';

export class PrestamoRepository{
    
    // CREAR PRESTAMO EN BBDD
    async crear (prestamoData){
        const {data, error} = await supabase //peticion 'insert' a supabase
            .from ('prestamos')
            .insert([prestamoData])
            .select()
            .single();

        if (error) throw error;
        return new Prestamo(prestamoData); //convertimos los datos en un objeto Prestamo y lo devolvemos
    }

    // BUSCAR-MOSTRAR UN PRESTAMO POR ID
    async buscarPorId(id) {
        const { data, error } = await supabase //peticion 'select' a supabase con condicion (solo queremos un prestamo)
            .from('prestamos')
            .select('*', libros(titulo),usuarios(nombre_completo)) //join para que muestre el titulo del libro prestado y el nombre del usuario que hace el prestamo
            .eq('id', id) //condicion: id indicado coincide con un id de la tabla
            .single();

        if (error) return null;
        return data ? new Prestamo(data) : null; //los datos encontrados los convertimos en objeto Prestamo, si no hay datos = 'null'
    }

    // BUSCAR-MOSTRAR TODOS LOS PRESTAMOS
    async buscarTodos() {
        const { data, error } = await supabase //peticion 'select' a supabase sin condicion (queremos todos los prestamos)
            .from('prestamos')
            .select('*', libros(titulo),usuarios(nombre_completo)) //join para mostrar el titulo del libro prestado y el usuario que hace el prestamo
            .order('created_at', { ascending: false }); //mostramos los prestamos ordenados de mas reciente a mas antiguo

        if (error) throw error;
        return data.map(item => new Prestamos(item)); //convertimos cada registro del array en objeto Prestamo
    }

    // ACTUALIZAR ESTADO DE UN PRESTAMO
    async actualizarEstado(id,nuevoEstado){
        const {data,error} = await supabase //peticion 'update' a supabase
            .from('prestamos')
            .update({estado:nuevoEstado}) //indicamos el campo que actualizamos
            .eq('id',id)
            .single();
        
        if (error) throw error;
        return new Prestamo(data)
    }

    // ELIMINAR UN PRESTAMO POR ID DE LA BBDD
    async eliminar(id) {
        const { error } = await supabase //peticion 'delete' a supabase
            .from('prestamos')
            .delete()
            .eq('id', id); //condicion: id indicado coincide con un id de la tabla

        if (error) throw error;
        return true;
    }
}