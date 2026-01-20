/**
 * Modelo de datos para Prestamo
 * Representa la estructura de un Prestamo en la base de datos
 */
// models/Prestamo.mjs
export class Prestamo {
    constructor(data) {
        this.id = data.id;
        this.libro_id = data.libro_id;
        this.usuario_id = data.usuario_id;
        this.fecha_prestamo = data.fecha_prestamo;
        this.estado = data.estado;
        this.created_at = data.created_at;
        this.updated_at = data.updated_at;
    }

    /**
     * Convierte el modelo a un objeto plano para la respuesta
     */
    toJSON() {
        return {
            id: this.id,
            libro_id: this.libro_id,
            usuario_id: this.usuario_id,
            fecha_prestamo: this.fecha_prestamo,
            estado: this.estado,
            created_at: this.created_at,
            updated_at: this.updated_at
        };
    }

    /**
     * Convierte el modelo a un objeto seguro (sin datos sensibles)
     */
    toPublic() {
        return {
            id: this.id,
            libro_id: this.libro_id,
            fecha_prestamo: this.fecha_prestamo,
            estado: this.estado,
            created_at: this.created_at
        };
    }

    // Validaciones para saber si el libro esta activo o no
    estaActivo() {
        return this.estado === 'ACTIVO';
    }
    //
    estaDevuelto() {
        return this.estado === 'DEVUELTO';
    }
}