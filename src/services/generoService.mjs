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

    async obtener(){
        return this.repository.obtener()
    }
    
    async eliminar(){

    }
}