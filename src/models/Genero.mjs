/**
 * Modelo de datos para Genero
 * Representa la estructura de un Genero en la base de datos
 */
// models/Genero.mjs
export class Genero {
    constructor(data) {
        this.id = data.id;
        this.nombre = data.nombre;
        this.created_at = data.created_at;
    }

  /**
   * Convierte el modelo a un objeto plano para la respuesta
   */
    toJSON() {
        return {
            id: this.id,
            nombre: this.nombre,
            created_at: this.created_at
        };
    }

  /**
   * Convierte el modelo a un objeto seguro (sin datos sensibles)
   */
    toPublic() {
    return {
        nombre: this.nombre,
        created_at: this.created_at
    };
    }
}