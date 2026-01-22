import { supabase } from "../config/database.mjs"
import { Genero } from "../models/Genero.mjs"

export class GeneroRepository {

    async crear(dataGenero) {
        const { data, error } = await supabase
            .from('generos')
            .insert([dataGenero])
            .select()
            .single()
        if (error) throw error
        return new Genero(data)
    }

    async buscarTodos() {
        const { data, error } = await supabase
            .from('generos')
            .select('*')

        if (error) throw error
        return data.map(item => new Genero(item))

    }

    async buscarPorId(id) {
        const { data, error } = await supabase
            .from('generos')
            .select('*')
            .eq('id', id)

        if (error) throw error
        return data ? new Genero(data) : null
    }

    async eliminar(id) {
        const { error } = await supabase
            .from('generos')
            .delete()
            .eq('id', id)

        if (error) throw error;
        return true;
    }
}