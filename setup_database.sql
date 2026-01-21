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

-- indices para facilitar operaciones
CREATE INDEX idx_libros_autor ON libros(autor_id);
CREATE INDEX idx_libros_generos_libro ON libros_generos(libro_id);
CREATE INDEX idx_libros_generos_genero ON libros_generos(genero_id);
CREATE INDEX idx_prestamos_libro ON prestamos(libro_id);
CREATE INDEX idx_prestamos_usuario ON prestamos(usuario_id);
CREATE INDEX idx_prestamos_estado ON prestamos(estado);

-- trigger para que se actualice automaticamente la fecha de actualizacion de la instancia cada vez que se realice una operacion de update
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_autores_updated_at BEFORE UPDATE ON autores
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_libros_updated_at BEFORE UPDATE ON libros
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_usuarios_updated_at BEFORE UPDATE ON usuarios
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_prestamos_updated_at BEFORE UPDATE ON prestamos
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- insercion de datos para poder tener algo con lo que trabajar de base
INSERT INTO autores (nombre_completo) VALUES
('Miguel de Cervantes'), ('Gabriel García Márquez'), ('Isabel Allende'), ('Jorge Luis Borges'), ('Julio Cortázar'), ('Pablo Neruda'),
('Octavio Paz'), ('Mario Vargas Llosa'), ('Carlos Ruiz Zafón'), ('Arturo Pérez-Reverte'), ('Javier Marías'), ('Rosa Montero'), ('Laura Esquivel'),
('Eduardo Mendoza'), ('Juan Rulfo');

INSERT INTO generos (nombre) VALUES
('Ficción'), ('Aventura'), ('Romance'), ('Fantasía'), ('Terror'), ('Misterio'), ('Histórica'), ('Poesía');

INSERT INTO libros (titulo, autor_id, stock) VALUES
-- Miguel de Cervantes (3 libros)
('Don Quijote de la Mancha', 1, 5),
('Novelas ejemplares', 1, 2),
('Los trabajos de Persiles y Sigismunda', 1, 3),
-- Gabriel García Márquez (5 libros - TOP autor)
('Cien años de soledad', 2, 3),
('El amor en los tiempos del cólera', 2, 5),
('Crónica de una muerte anunciada', 2, 4),
('El coronel no tiene quien le escriba', 2, 2),
('Del amor y otros demonios', 2, 3),
-- Isabel Allende (4 libros)
('La casa de los espíritus', 3, 4),
('De amor y de sombra', 3, 3),
('Eva Luna', 3, 2),
('Paula', 3, 5),
-- Jorge Luis Borges (3 libros)
('Ficciones', 4, 2),
('El Aleph', 4, 4),
('Historia universal de la infamia', 4, 2),
-- Julio Cortázar (2 libros)
('Rayuela', 5, 3),
('Bestiario', 5, 2),
-- Pablo Neruda (2 libros)
('Veinte poemas de amor y una canción desesperada', 6, 6),
('Residencia en la tierra', 6, 3),
-- Octavio Paz (1 libro)
('El laberinto de la soledad', 7, 2),
-- Mario Vargas Llosa (4 libros)
('La ciudad y los perros', 8, 3),
('La tía Julia y el escribidor', 8, 3),
('Conversación en La Catedral', 8, 2),
('La fiesta del chivo', 8, 4),
-- Carlos Ruiz Zafón (3 libros)
('La sombra del viento', 9, 8),
('El juego del ángel', 9, 6),
('El prisionero del cielo', 9, 4),
-- Arturo Pérez-Reverte (2 libros)
('El capitán Alatriste', 10, 4),
('La reina del sur', 10, 5),
-- Javier Marías (1 libro)
('Corazón tan blanco', 11, 3),
-- Rosa Montero (1 libro)
('La ridícula idea de no volver a verte', 12, 5),
-- Laura Esquivel (1 libro)
('Como agua para chocolate', 13, 7),
-- Eduardo Mendoza (1 libro)
('La verdad sobre el caso Savolta', 14, 2),
-- Juan Rulfo (1 libro)
('Pedro Páramo', 15, 4);

INSERT INTO libros_generos (libro_id, genero_id) VALUES
-- Don Quijote (1)
(1, 1), (1, 2), (1, 3),
-- Novelas ejemplares (2)
(2, 1),
-- Los trabajos de Persiles (3)
(3, 1), (3, 2),
-- Cien años de soledad (4)
(4, 1), (4, 7),
-- El amor en los tiempos del cólera (5)
(5, 1), (5, 3),
-- Crónica de una muerte anunciada (6)
(6, 1), (6, 6),
-- El coronel no tiene quien le escriba (7)
(7, 1),
-- Del amor y otros demonios (8)
(8, 1), (8, 3),
-- La casa de los espíritus (9)
(9, 1), (9, 3), (9, 7),
-- De amor y de sombra (10)
(10, 1), (10, 7),
-- Eva Luna (11)
(11, 1), (11, 3),
-- Paula (12)
(12, 1),
-- Ficciones (13)
(13, 1), (13, 4),
-- El Aleph (14)
(14, 1), (14, 4),
-- Historia universal de la infamia (15)
(15, 1),
-- Rayuela (16)
(16, 1),
-- Bestiario (17)
(17, 1), (17, 4),
-- Veinte poemas (18)
(18, 8), (18, 3),
-- Residencia en la tierra (19)
(19, 8),
-- El laberinto de la soledad (20)
(20, 1),
-- La ciudad y los perros (21)
(21, 1), (21, 7),
-- La tía Julia y el escribidor (22)
(22, 1), (22, 3),
-- Conversación en La Catedral (23)
(23, 1), (23, 7),
-- La fiesta del chivo (24)
(24, 1), (24, 7),
-- La sombra del viento (25)
(25, 1), (25, 6), (25, 7),
-- El juego del ángel (26)
(26, 1), (26, 6), (26, 7),
-- El prisionero del cielo (27)
(27, 1), (27, 6),
-- El capitán Alatriste (28)
(28, 2), (28, 7),
-- La reina del sur (29)
(29, 1), (29, 2),
-- Corazón tan blanco (30)
(30, 1), (30, 6);

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
-- Usuario 1 (Juan) - 3 préstamos
(1, 1, '2026-01-10', 'DEVUELTO'),
(25, 1, '2026-01-16', 'ACTIVO'),
(4, 1, '2026-01-18', 'ACTIVO'),
-- Usuario 2 (María) - 2 préstamos
(5, 2, '2026-01-12', 'ACTIVO'),
(20, 2, '2026-01-05', 'DEVUELTO'),
-- Usuario 3 (Carlos) - 2 préstamos
(9, 3, '2026-01-15', 'ACTIVO'),
(26, 3, '2026-01-09', 'DEVUELTO'),
-- Usuario 4 (Ana) - 1 préstamo
(16, 4, '2026-01-08', 'DEVUELTO'),
-- Usuario 5 (Luis) - 3 préstamos
(18, 5, '2026-01-18', 'ACTIVO'),
(30, 5, '2026-01-17', 'ACTIVO'),
(6, 5, '2026-01-14', 'DEVUELTO'),
-- Usuario 6 (Carmen) - 1 préstamo
(28, 6, '2026-01-17', 'ACTIVO'),
-- Usuario 7 (Pedro) - 3 préstamos
(30, 7, '2026-01-14', 'ACTIVO'),
(19, 7, '2026-01-15', 'ACTIVO'),
(7, 7, '2026-01-10', 'DEVUELTO'),
-- Usuario 8 (Laura) - 2 préstamos
(13, 8, '2026-01-11', 'DEVUELTO'),
(22, 8, '2026-01-16', 'ACTIVO'),
-- Usuario 9 (Diego) - 2 préstamos
(15, 9, '2026-01-16', 'ACTIVO'),
(21, 9, '2026-01-13', 'DEVUELTO'),
-- Usuario 10 (Sofía) - 1 préstamo
(29, 10, '2026-01-13', 'ACTIVO');


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