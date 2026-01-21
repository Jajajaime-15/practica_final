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

    async obtener(){

    }

    async eliminar(){

    }
}