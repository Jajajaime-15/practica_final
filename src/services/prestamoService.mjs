import { PrestamoRepository } from '../repositories/prestamoRepository.mjs';
import { LibroRepository } from '../repositories/libroRepository.mjs';
import { UsuarioRepository } from '../repositories/usuarioRepository.mjs';

export class PrestamoService{
    constructor(){
        this.repository = new PrestamoRepository();
        this.libroRepository = new LibroRepository();
        this.usuarioRepository = new UsuarioRepository();
    }

    //CREAR PRESTAMO NUEVO
    async crearPrestamo(datosPrestamo){
        const{libro_id,usuario_id,fecha_prestamo} = datosPrestamo;

        // VALIDACIONES
        //comprobar que tiene un id de libro
        if(!libro_id || isNaN(libro_id)){
            throw new Error ('El ide del libro es obligatorio')
        }
        //comprobar que tiene un id de usuario
        if(!usuario_id || isNaN(usuario_id)){
            throw new Error ('El ide del usuario es obligatorio')
        }
        //comprobar que el libro existe
        const libro = await this.libroRepository.buscarPorId(libro_id);
        if(!libro){
            throw new Error ('El libro no existe')
        }
        //comprobar que el usuario existe
        const usuario = await this.usuarioRepository.buscarPorId(usuario_id);
        if(!usuario){
            throw new Error ('El usuario no existe')
        }
        //comprobar que hay stock
        if (libro.stock <= 0) {
            throw new Error('No hay stock disponible');
        }

        //LOGICA DE NEGOCIO -- REDUCIR STOCK EN 1
        await this.libroRepository.actualizarStock(libro_id,libro.stock-1);

        //CREAR
        const prestamo = await this.repository.crear({
            libro_id,
            usuario_id,
            fecha_prestamo: fecha_prestamo,
            estado: 'ACTIVO'
        });

        return prestamo;
    }

    //BUSCAR-MOSTRAR PRESTAMO POR ID
    async buscarPrestamo(id){

        // VALIDACIONES
        //comprobar que el id es un numero valido
        if(!id || isNaN(id)){
            throw new Error ('El id del prestamo no es valido')
        }

        //BUSCAR - MOSTRAR
        const prestamo = await this.repository.buscarPorId(id);
        if(!prestamo){
            throw new Error ('No se ha encontrado el prestamo con el id: ',id);
        }

        return prestamo;
    }

    // BUSCAR-MOSTRAR TODOS LOS PRESTAMOS
    async mostrarPrestamos(){
        return await this.repository.buscarTodos();
    }

    // ACTUALIZAR ESTADO DEL PRESTAMO
    async actualizarEstado(id, nuevoEstado){

        // VALIDACIONES
        //comprobar que el id es un numero valido
        if(!id || isNaN(id)){
            throw new Error ('El id del usuario no es valido')
        }
        //comprobar que tenga un estado
        if(!nuevoEstado){
            throw new Error ('El estado del prestamo es obligatorio')
        }
        //comprobar que el estado es ACTIVO o DEVUELTO
        if(nuevoEstado !== 'ACTIVO' && nuevoEstado !== 'DEVUELTO'){
            throw new Error ('El estado del prestamo no es valido, tiene que ser activo o devuelto')
        }
        //buscamos el prestamo
        const prestamo = await this.repository.buscarPorId(id);
        if(!prestamo){
            throw new Error ('Prestamo no encontrado');
        }
        //LOGICA DE NEGOCIO -- AUMENTAR STOCK EN 1 SI EL ESTADO CAMBIA A DEVUELTO
        const libro = await this.libroRepository.buscarPorId(prestamo.libro_id);
        // pasa a devuelto +1
        if (prestamo.estado === 'ACTIVO' && nuevoEstado === 'DEVUELTO') {
            await this.libroRepository.actualizarStock(prestamo.libro_id, libro.stock + 1);
        }

        return await this.repository.actualizarEstado(id, { nuevoEstado });
    }

    // ELIMINAR PRESTAMO POR ID
    async eliminarPrestamo(id){

        // VALIDACIONES
        //comprobar que el id es un numero valido
        if(!id || isNaN(id)){
            throw new Error ('El id del prestamo no es valido')
        }
        //buscamos que existe el prestamo con el id indicado
        const prestamo = await this.repository.buscarPorId(id);
        if(!prestamo){
            throw new Error ('No se ha encontrado el prestamo con el id: ',id);
        }
        //si el estado del prestamo es activo al eliminarlo se devuelve el libro +1 en stock
        if(prestamo.estado === 'ACTIVO'){
            const libro = await this.libroRepository.buscarPorId(prestamo.libro_id);
            await this.libroRepository.actualizarStock(prestamo.libro_id, libro.stock + 1);
        }
        // ELIMINAR
        return await this.repository.eliminar(id);
    }
}