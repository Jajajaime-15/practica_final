import { UsuarioRepository } from '../repositories/usuarioRepository.mjs';

export class UsuarioService {
    constructor() {
        this.repository = new UsuarioRepository();
    }

    // CREAR USUARIO NUEVO
    async crearUsuario(nombre_completo, email) {
        // VALIDACIONES
        // comprobar que el nombre no esta vacio
        if (!nombre_completo || (nombre_completo.trim() == '')) {
            throw new Error('El nombre del usuario es obligatorio')
        }
        // el nombre tiene que tener minimo 3 caracteres
        if (nombre_completo.trim().length < 3) {
            throw new Error('El nombre del usuario tiene que tener minimo 3 caracteres')
        }
        // comprobar que el email no esta vacio
        if (!email || email.trim() == '') {
            throw new Error('El email es obligatorio')
        }
        // formato de email valido
        const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // regex para comprobar que el email sea valido
        if (!emailValido.test(email)) {
            throw new Error('El formato de email no es valido');
        }

        // CREAR
        const usuario = await this.repository.crear({
            nombre_completo: nombre_completo.trim(),
            email: email.trim().toLowerCase() // guardamos el email en minusculas
        });

        return usuario;
    }

    // BUSCAR-MOSTRAR UN USUARIO POR ID
    async buscarUsuario(id) {

        // VALIDACIONES
        // comprobar que el id es un numero valido
        if (!id || isNaN(id)) {
            throw new Error('El id del usuario no es valido')
        }

        // BUSCAR - MOSTRAR
        const usuario = await this.repository.buscarPorId(id);
        if (!usuario) {
            throw new Error('No se ha encontrado el usuario con el id: ', id);
        }

        return usuario;
    }

    // BUSCAR-MOSTRAR TODOS LOS USUARIOS
    async mostrarUsuarios() {
        return await this.repository.buscarTodos();
    }

    // ACTUALIZAR EMAIL
    async actualizarEmail(id, nuevoEmail) {
        // VALIDACIONES
        // comprobar que el id es un numero valido
        if (!id || isNaN(id)) {
            throw new Error('El id del usuario no es valido')
        }
        // buscamos que existe el usuario con el id indicado
        const usuario = await this.repository.buscarPorId(id);
        if (!usuario) {
            throw new Error('No se ha encontrado el usuario con el id: ', id);
        }
        // comprobar que el email no esta vacio
        if (!nuevoEmail || nuevoEmail.trim() == '') {
            throw new Error('El email es obligatorio')
        }
        // formato de email valido
        const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // regex para comprobar que el email sea valido
        if (!emailValido.test(nuevoEmail)) {
            throw new Error('El formato de email no es valido');
        }
        const email = nuevoEmail.trim().toLowerCase()

        // ACTUALIZAR
        return await this.repository.actualizarEmail(id, email);
    }

    // ELIMINAR USUARIO POR ID
    async eliminarUsuario(id) {

        // VALIDACIONES
        // comprobar que el id es un numero valido
        if (!id || isNaN(id)) {
            throw new Error('El id del usuario no es valido')
        }

        // buscamos que existe el usuario con el id indicado
        const usuario = await this.repository.buscarPorId(id);
        if (!usuario) {
            throw new Error('No se ha encontrado el usuario con el id: ', id);
        }

        // ELIMINAR
        await this.repository.eliminar(id);

        return usuario
    }
}