import { GeneroRepository } from "../repositories/generoRepository.mjs"

export class GeneroService {
    constructor(){
        this.repository = new GeneroRepository()
    }

    // creamos un genero
    async crear(nombre){
        if (!nombre){ // comprobamos que se haya introducido un nombre
            throw new Error('Se requiere nombre del genero')
        }
        if(nombre.trim().length < 3){ // comprobamos que el nombre tenga una longitud minima
            throw new Error ('El nombre del genero tiene que tener minimo 3 caracteres')
        }

        return await this.repository.crear(nombre.trim())
    }

    // mostramos todos los generos
    async listar(){ 
        return await this.repository.listar()
    }

    // buscamos un genero mediante su id
    async obtener(id){
        // comprobamos que el id es un numero valido
        if(!id || isNaN(id)){
            throw new Error ('El id del genero no es valido')
        }

        return await this.repository.obtener(id)
    }
    
    // eliminamos un genero de la tabla
    async eliminar(id){
        // comprobamos que el id es un numero valido
        if(!id || isNaN(id)){
            throw new Error ('El id del genero no es valido')
        }

        // buscamos que existe el genero con el id indicado
        const genero = await this.repository.obtener(id);
        if(!genero){
            throw new Error ('No se ha encontrado el genero con el id: ', id);
        }

        await this.repository.eliminar(id); // la operacion de eliminacion del genero

        return genero; // devolvemos el genero que se ha encontrado y ha sido eliminado para notificar al cliente
    }
}