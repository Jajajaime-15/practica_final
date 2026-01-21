import { param } from 'express/lib/application';
import { supabase } from '../config/database.mjs';
import { Autor } from '../models/Autor.mjs';

// MOSTRAR TOP AUTORES
  //Tambien se puede crear una funcion postgre(rpc) y llamarla desde supabase
    async topAutores() {
    console.log("-- TOP AUTORES --");
    
    try {
        // Obtener todos los autores
        const { data: autores, error: errorAutores } = await supabase
            .from('autores')
            .select('id, nombre_completo');
        
        if (errorAutores) throw errorAutores;
        
        console.log(` Autores en total: ${autores.length}`);
        
        //Obtener TODOS los libros
        const { data: todosLosLibros, error: errorLibros } = await supabase
            .from('libros')
            .select('id, autor_id');
        
        if (errorLibros) throw errorLibros;
        
        //Obtener TODOS los préstamos
        const { data: todosLosPrestamos, error: errorPrestamos } = await supabase
            .from('prestamos')
            .select('id, libro_id');
        
        if (errorPrestamos) throw errorPrestamos;
        
        console.log(` Prestamos totales: ${todosLosPrestamos.length}`);
        
        //Crear map
        const autorPorLibro = {};
        todosLosLibros.forEach(libro => {
            autorPorLibro[libro.id] = libro.autor_id;
        });
        
        //Contar préstamos por autor
        const prestamosPorAutor = {};
        
        // Inicializar todos los autores con 0
        autores.forEach(autor => {
            prestamosPorAutor[autor.id] = {
                autor: autor,
                total_prestamos: 0,
                libros_con_prestamos: new Set()  // Para libros únicos
            };
        });
        
        // Contar cada préstamo
        todosLosPrestamos.forEach(prestamo => {
            const autorId = autorPorLibro[prestamo.libro_id];
            
            if (autorId && prestamosPorAutor[autorId]) {
                prestamosPorAutor[autorId].total_prestamos += 1;
                prestamosPorLibro[autorId].libros_con_prestamos.add(prestamo.libro_id);
            }
        });
        
        //Convertir a array y ordenar
        const resultadosArray = Object.values(prestamosPorAutor)
            .filter(item => item.total_prestamos > 0)  // Solo autores con préstamos
            .map(item => ({
                id: item.autor.id,
                nombre_completo: item.autor.nombre_completo,
                total_prestamos: item.total_prestamos,
                libros_con_prestamos: item.libros_con_prestamos.size
            }))
            .sort((a, b) => b.total_prestamos - a.total_prestamos)  // Orden descendente
            .slice(0, 10)  // Top 10
            .map((item, index) => ({
                ranking: index + 1,
                ...item
            }));
        
        //Mostrar resultados
        console.log(" Top 10 autores REALES calculado:");
        if (resultadosArray.length === 0) {
            console.log(" No hay autores con préstamos");
        } else {
            console.table(resultadosArray);
        }
        
        return resultadosArray;
        
    } catch (error) {
        console.error("Error:", error);
        return []; // Devolver array vacío en caso de error
    }
}