import { GeneroRepository } from "../repositories/generoRepository.mjs"

export class GeneroService {
    constructor(){
        this.repository = new GeneroRepository()
    }

    async crear(){
        
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