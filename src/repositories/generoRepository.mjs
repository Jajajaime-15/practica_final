import { supabase } from "../config/database.mjs"
import { Genero } from "../models/Genero.mjs"

export class GeneroRepository {

    // crear un genero en la bbdd
    async crear(dataGenero) {
        const { data, error } = await supabase
            .from('generos')
            .insert([dataGenero])
            .select() // para obtener el resultado que acabamos de insertar, se almacenara como data
            .single() // para obtener ese resultado como un objeto en vez de como un array
        if (error) throw error
        return new Genero(data) // devolvemos con el objeto obtenido
    }
    // buscar todos los generos en la bbdd
    async buscarTodos() {
        const { data, error } = await supabase
            .from('generos')
            .select('*')

        if (error) throw error
        return data.map(item => new Genero(item))
    }
    // buscar un genero por id en la bbdd
    async buscarPorId(id) {
        const { data, error } = await supabase
            .from('generos')
            .select('*')
            .eq('id', id)
            .single()

        if (error) throw error
        return data ? new Genero(data) : null
    }
    // eliminar un genero de la bbdd
    async eliminar(id) {
        const { error } = await supabase
            .from('generos')
            .delete()
            .eq('id', id)

        if (error) throw error;
        return true;
    }
}