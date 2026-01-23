import { supabase } from '../config/database.mjs';

export class EstadisticasRepository {

  async obtenerPrestamosActivos() {
    const { data, error } = await supabase
      .from('prestamos')
      .select('*, usuarios (nombre_completo,email), libros (titulo)') // obtenemos toda la info del prestamo y lo relevante de usuario y libro, haciendo dos join
      .eq('estado', 'ACTIVO') // que sea si o si activo
      .order('fecha_prestamo', { ascending: false });
    
    if (error) throw error;
    return data // no necesitamos instanciar los datos ya que cogemos de varias tablas
  }

  async obtenerLibrosConGeneros() { // para hacer uso de la tabla intermedia creada con relacion N:M, mostrando asi la relacion de libros y generos
    const { data, error } = await supabase
      .from('libros')
      .select('titulo, autores (nombre_completo), libros_generos (generos (nombre))') // hacemos uso del id de genero en la intermedia para acceder directamente
      .order('titulo', {ascending: true})
    
    if (error) throw error;
    return data
  }
}