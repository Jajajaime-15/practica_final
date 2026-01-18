/**
 * Modelo de datos para Usuario
 * Representa la estructura de un Usuario en la base de datos
 */
// models/Usuario.mjs
export class Usuario {
  constructor(data) {
    this.id = data.id;
    this.nombre_completo = data.nombre_completo;
    this.email = data.email;
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
      email: this.email,
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

  // Validaciones
  isValid() {
    return this.nombre_completo && this.email;
  }
}