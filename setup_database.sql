-- nombre completo de los autores para facilitar su busqueda
CREATE TABLE autores (
  id SERIAL PRIMARY KEY,
  nombre_completo VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- (1:N con autores)
CREATE TABLE libros (
  id SERIAL PRIMARY KEY,
  titulo VARCHAR(255) NOT NULL,
  autor_id INTEGER NOT NULL,
  stock INTEGER DEFAULT 1 CHECK (stock >= 0), -- importante para controlar el stock con los prestamos
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  
  FOREIGN KEY (autor_id) REFERENCES autores(id) ON DELETE RESTRICT
);

-- tabla generos sin actualizarlos ya que los generos seran unicos y solo tendran nombre, no necesitamos actualizarlos
CREATE TABLE generos (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- (N:M) tabla intermedia para cumplir con los requisitos del enunciado
CREATE TABLE libros_generos (
  libro_id INTEGER NOT NULL,
  genero_id INTEGER NOT NULL,
  
  PRIMARY KEY (libro_id, genero_id),
  FOREIGN KEY (libro_id) REFERENCES libros(id) ON DELETE CASCADE,
  FOREIGN KEY (genero_id) REFERENCES generos(id) ON DELETE CASCADE
);

-- de nuevo el nombre completo para facilitar
CREATE TABLE usuarios (
  id SERIAL PRIMARY KEY,
  nombre_completo VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- (1:N con libros y usuarios)
CREATE TABLE prestamos (
  id SERIAL PRIMARY KEY,
  libro_id INTEGER NOT NULL,
  usuario_id INTEGER NOT NULL,
  fecha_prestamo DATE DEFAULT CURRENT_DATE,
  estado VARCHAR(20) DEFAULT 'ACTIVO', -- podra ser activo o devuelto
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  
  FOREIGN KEY (libro_id) REFERENCES libros(id) ON DELETE RESTRICT,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE RESTRICT
);


CREATE INDEX idx_libros_autor ON libros(autor_id);
CREATE INDEX idx_libros_generos_libro ON libros_generos(libro_id);
CREATE INDEX idx_libros_generos_genero ON libros_generos(genero_id);
CREATE INDEX idx_prestamos_libro ON prestamos(libro_id);
CREATE INDEX idx_prestamos_usuario ON prestamos(usuario_id);
CREATE INDEX idx_prestamos_estado ON prestamos(estado);

-- insercion de datos para poder tener algo con lo que trabajar de base
INSERT INTO autores (nombre_completo) VALUES
('Miguel de Cervantes'), ('Gabriel García Márquez'), ('Isabel Allende'), ('Jorge Luis Borges'), ('Julio Cortázar'), ('Pablo Neruda'),
('Octavio Paz'), ('Mario Vargas Llosa'), ('Carlos Ruiz Zafón'), ('Arturo Pérez-Reverte'), ('Javier Marías'), ('Rosa Montero'), ('Laura Esquivel'),
('Eduardo Mendoza'), ('Juan Rulfo');

INSERT INTO generos (nombre) VALUES
('Ficción'), ('Aventura'), ('Romance'), ('Fantasía'), ('Terror'), ('Misterio'), ('Histórica'), ('Poesía');

INSERT INTO libros (titulo, autor_id, stock) VALUES
('Don Quijote de la Mancha', 1, 5),
('Cien años de soledad', 2, 3),
('La casa de los espíritus', 3, 4),
('Ficciones', 4, 2),
('Rayuela', 5, 3),
('Veinte poemas de amor y una canción desesperada', 6, 6),
('El laberinto de la soledad', 7, 2),
('La ciudad y los perros', 8, 3),
('La sombra del viento', 9, 8),
('El capitán Alatriste', 10, 4),
('Corazón tan blanco', 11, 3),
('La ridícula idea de no volver a verte', 12, 5),
('Como agua para chocolate', 13, 7),
('La verdad sobre el caso Savolta', 14, 2),
('Pedro Páramo', 15, 4),
('El amor en los tiempos del cólera', 2, 5),
('La tía Julia y el escribidor', 8, 3),
('El juego del ángel', 9, 6),
('Novelas ejemplares', 1, 2),
('Residencia en la tierra', 6, 3);

INSERT INTO libros_generos (libro_id, genero_id) VALUES
-- Don Quijote
(1, 1), (1, 2), (1, 3),
-- Cien años de soledad
(2, 1), (2, 7),
-- La casa de los espíritus
(3, 1), (3, 3), (3, 7),
-- Ficciones
(4, 1), (4, 4),
-- Rayuela
(5, 1),
-- Veinte poemas
(6, 8), (6, 3),
-- El laberinto
(7, 1),
-- La ciudad y los perros
(8, 1), (8, 7),
-- La sombra del viento
(9, 1), (9, 6), (9, 7),
-- Alatriste
(10, 2), (10, 7),
-- Corazón tan blanco
(11, 1), (11, 6),
-- La ridícula idea
(12, 1),
-- Como agua para chocolate
(13, 3), (13, 4),
-- Savolta
(14, 1), (14, 6), (14, 7),
-- Pedro Páramo
(15, 1), (15, 4),
-- El amor en los tiempos
(16, 1), (16, 3),
-- La tía Julia
(17, 1), (17, 3),
-- El juego del ángel
(18, 1), (18, 6), (18, 7),
-- Novelas ejemplares
(19, 1),
-- Residencia en la tierra
(20, 8);

INSERT INTO usuarios (nombre_completo, email) VALUES
('Juan Pérez García', 'juan.perez@email.com'),
('María López Rodríguez', 'maria.lopez@email.com'),
('Carlos Martínez Sánchez', 'carlos.martinez@email.com'),
('Ana González Fernández', 'ana.gonzalez@email.com'),
('Luis Hernández Díaz', 'luis.hernandez@email.com'),
('Carmen Ruiz Torres', 'carmen.ruiz@email.com'),
('Pedro Jiménez Moreno', 'pedro.jimenez@email.com'),
('Laura Álvarez Romero', 'laura.alvarez@email.com'),
('Diego Navarro Serrano', 'diego.navarro@email.com'),
('Sofía Morales Castro', 'sofia.morales@email.com');

INSERT INTO prestamos (libro_id, usuario_id, fecha_prestamo, estado) VALUES
(1, 1, '2026-01-10', 'DEVUELTO'),
(2, 2, '2026-01-12', 'ACTIVO'),
(3, 3, '2026-01-15', 'ACTIVO'),
(9, 1, '2026-01-16', 'ACTIVO'),
(5, 4, '2026-01-08', 'DEVUELTO'),
(6, 5, '2026-01-18', 'ACTIVO'),
(7, 2, '2026-01-05', 'DEVUELTO'),
(10, 6, '2026-01-17', 'ACTIVO'),
(11, 7, '2026-01-14', 'ACTIVO'),
(13, 8, '2026-01-11', 'DEVUELTO'),
(15, 9, '2026-01-16', 'ACTIVO'),
(16, 10, '2026-01-13', 'ACTIVO'),
(18, 3, '2026-01-09', 'DEVUELTO'),
(19, 5, '2026-01-17', 'ACTIVO'),
(20, 7, '2026-01-15', 'ACTIVO');


-- tablas y datos proporcionadas por el docente
/*
CREATE TABLE IF NOT EXISTS api_keys (
  id SERIAL PRIMARY KEY,
  api_key UUID UNIQUE NOT NULL,
  client_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
-- Índice para búsquedas rápidas por api_key
CREATE INDEX IF NOT EXISTS idx_api_keys_api_key ON api_keys(api_key);

-- Índice para filtrar por estado activo
CREATE INDEX IF NOT EXISTS idx_api_keys_is_active ON api_keys(is_active);

-- Índice para filtrar por rol
CREATE INDEX IF NOT EXISTS idx_api_keys_role ON api_keys(role);

-- Trigger para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_api_keys_updated_at BEFORE UPDATE ON api_keys
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column(); 

*/

-- ============================================
-- DATOS DE EJEMPLO (OPCIONAL)
-- ============================================

-- Insertar un administrador de ejemplo para pruebas (opcional)
-- Descomenta las siguientes líneas para crear un admin de prueba
-- INSERT INTO api_keys (api_key, client_name, email, role) 
-- VALUES (
--   gen_random_uuid(), 
--   'Admin', 
--   'admin@example.com',
--   'admin'
-- );

-- Insertar un usuario normal de ejemplo (opcional)
-- INSERT INTO api_keys (api_key, client_name, email, role) 
-- VALUES (
--   gen_random_uuid(), 
--   'Usuario de Prueba', 
--   'user@example.com',
--   'user'
-- );