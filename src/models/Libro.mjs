/**
 * Modelo de datos para Libro
 * Representa la estructura de un Libro en la base de datos
 */
// models/Libro.mjs
export class Libro {
  constructor(data) {
    this.id = data.id;
    this.titulo = data.titulo;
    this.autor_id = data.autor_id;
    this.stock = data.stock;
    this.created_at = data.created_at;
    this.updated_at = data.updated_at;
  }

  /**
   * Convierte el modelo a un objeto plano para la respuesta
   */
  toJSON() {
    return {
      id: this.id,
      titulo: this.titulo,
      autor_id: this.autor_id,
      stock: this.stock,
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
      titulo: this.titulo,
      autor_id: this.autor_id,
      stock: this.stock,
      created_at: this.created_at
    };
  }

  // Validacion para ver si hay stock o no del libro
  hayStock() {
    return this.stock > 0;
  }
}