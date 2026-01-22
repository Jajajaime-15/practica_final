import { AutorRepository } from '../repositories/autorRepository.mjs';

export class AutorService {
    constructor() {
        this.repository = new AutorRepository();
    }

    // CREAR AUTOR NUEVO
    async crearAutor(nombre_completo) {

        // VALIDACIONES
        //comprobar que el nombre no esta vacio
        if (!nombre_completo || nombre_completo.trim() == '') {
            throw new Error('El nombre del autor es obligatorio.')
        }
        //el nombre tiene que tener minimo 3 caracteres
        if (nombre_completo.trim().length < 3) {
            throw new Error('El nombre del autor tiene que tener minimo 3 caracteres')
        }

        //CREAR
        const autor = await this.repository.crear({
            nombre_completo: nombre_completo.trim()
        });

        return autor;
    }

    // BUSCAR-MOSTRAR UN AUTOR POR ID
    async buscarAutor(id) {

        // VALIDACIONES
        //comprobar que el id es un numero valido
        if (!id || isNaN(id)) {
            throw new Error('El id del autor no es valido')
        }

        //BUSCAR - MOSTRAR
        const autor = await this.repository.buscarPorId(id);
        if (!autor) {
            throw new Error('No se ha encontrado el autor con el id: ', id);
        }

        return autor;
    }

    // BUSCAR-MOSTRAR TODOS LOS AUTORES
    async mostrarAutores() {
        return await this.repository.buscarTodos();
    }

    // ELIMINAR AUTOR POR ID
    async eliminarAutor(id) {

        // VALIDACIONES
        //comprobar que el id es un numero valido
        if (!id || isNaN(id)) {
            throw new Error('El id del autor no es valido')
        }

        //buscamos que existe el autor con el id indicado
        const autor = await this.repository.buscarPorId(id);
        if (!autor) {
            throw new Error('No se ha encontrado el autor con el id: ', id);
        }

        // ELIMINAR
        return await this.repository.eliminar(id);
    }
}