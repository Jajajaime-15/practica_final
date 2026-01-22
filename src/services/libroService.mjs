import { LibroRepository } from '../repositories/libroRepository.mjs';
import { AutorRepository } from '../repositories/autorRepository.mjs';

export class LibroService{
    constructor(){
        this.repository = new LibroRepository();
        this.autorRepository = new AutorRepository(); //repositorio de autor para comprobar que el autor existe
    }

    // CREAR LIBRO NUEVO
    async crearLibro(datosLibro){
        const {titulo,autor_id,stock} = datosLibro;

        // VALIDACIONES
        //comprobar que el titulo no esta vacio
        if(!titulo || titulo.trim() == '' ){
            throw new Error ('El titulo es obligatorio.')
        }
        //comprobar que el id del autor no esta vacio y es un numero
        if(!autor_id || isNaN(autor_id)){
            throw new Error ('El id del autor es obligatorio y debe de ser un numero')
        }
        //comprobar que el autor existe en la base de datos
        const existeAutor = await this.autorRepository.buscarPorId(autor_id);
        if(!existeAutor){
            throw new Error ('No hay ningun autor con el id ', autor_id, ' en la base de datos')
        }
        //comprobamos que el stock no es negativo
        if(stock < 0){
            throw new Error ('El stock no puede estar en negativo')
        }        

        //CREAR 
        const libro = await this.repository.crear({
            titulo: titulo.trim(),
            autor_id: autor_id,
            stock: stock
        });

        return libro;
    }

    // BUSCAR-MOSTRAR UN LIBRO POR ID
    async buscarLibro(id){

        // VALIDACIONES
        //comprobar que el id es un numero valido
        if(!id || isNaN(id)){
            throw new Error ('El id del libro no es valido')
        }

        //BUSCAR-MOSTRAR
        const libro = await this.repository.buscarPorId(id);
        if(!libro){
            throw new Error ('No se ha encontrado el libro con el id: ',id);
        }

        return libro;
    }

    // BUSCAR-MOSTRAR TODOS LOS LIBROS
    async mostrarLibros(){
        return await this.repository.buscarTodos();
    }

    //ACTUALIZAR STOCK
    async actualizarStock(id,nuevoStock){

        // VALIDACIONES
        // comprobar que el id es un numero valido
        if(!id || isNaN(id)){
            throw new Error ('El id del libro no es valido')
        }
        // comprobar que el stock no es negativo
        if(nuevoStock < 0){
            throw new Error ('El stock no puede estar en negativo')
        }
        // buscamos que existe el libro con el id indicado
        const libro = await this.repository.buscarPorId(id);
        if(!libro){
            throw new Error ('No se ha encontrado el libro con el id: ', id);
        }

        //ACTUALIZAR
        return await this.repository.actualizarStock(id, nuevoStock);
    }

    // ELIMINAR LIBRO POR ID
    async eliminarLibro(id){

        // VALIDACIONES
        //comprobar que el id es un numero valido
        if(!id || isNaN(id)){
            throw new Error ('El id del libro no es valido')
        }

        //buscamos que existe el libro con el id indicado
        const libro = await this.repository.buscarPorId(id);
        if(!libro){
            throw new Error ('No se ha encontrado el libro con el id: ',id);
        }

        // ELIMINAR
        return await this.repository.eliminar(id);
    }
}