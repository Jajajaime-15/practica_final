import { supabase } from "../config/database.mjs"
import { Genero } from "../models/Genero.mjs"

export class GeneroRepository{
    
    async crear(){

    }
    
    async listar(){
        const { data, error } = await supabase
        .from('generos')
        .select('*')

        if (error) throw error
        return data.map(item => new Genero(item))

    }

    async obtener(id){
        const { data, error } = await supabase
        .from('generos')
        .select('*')
        .eq('id', id)

        if (error) throw error
        return data ? new Genero(data) : null
    }

    async eliminar(){

    }
}