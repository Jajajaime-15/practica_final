/**
 * Modelo de datos para Autor
 * Representa la estructura de un Autor en la base de datos
 */
// models/Autor.mjs
export class Autor {
    constructor(data) {
        this.id = data.id;
        this.nombre_completo = data.nombre_completo;
        this.created_at = data.created_at;
        this.updated_at = data.updated_at;
    }

  /**
   * Convierte el modelo a un objeto plano para la respuesta
   */
    toJSON() {
        return {
            id: this.id,
            nombre_completo: this.nombre_completo,
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
            nombre_completo: this.nombre_completo,
            created_at: this.created_at
        };
    }
}