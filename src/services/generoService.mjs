import { GeneroRepository } from "../repositories/generoRepository.mjs"

export class GeneroService {
    constructor(){
        this.repository = new GeneroRepository()
    }

    async crear(nombre){
        if (!nombre){
            throw new Error('Se requiere nombre del genero')
        }
        
        
    }

    async listar(){
        return this.repository.listar()
    }

    async obtener(id){
        return this.repository.obtener(id)
    }
    
    async eliminar(){

    }
}