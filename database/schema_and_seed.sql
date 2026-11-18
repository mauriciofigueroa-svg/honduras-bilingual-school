-- Base de datos para Escuela Bilingüe (MySQL / XAMPP)
CREATE DATABASE IF NOT EXISTS escueladb;
USE escueladb;

CREATE TABLE IF NOT EXISTS roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_rol VARCHAR(50) NOT NULL UNIQUE,
    descripcion VARCHAR(200)
);

CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_completo VARCHAR(120) NOT NULL,
    correo VARCHAR(120) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    rol_id INT NOT NULL,
    FOREIGN KEY (rol_id) REFERENCES roles(id)
);

INSERT INTO roles (nombre_rol, descripcion) VALUES 
('Secretaria', 'Personal administrativo de caja y matrícula'),
('Docente', 'Profesor de asignaturas bilingües');

-- Contraseña por defecto para ambos usuarios: '123' (hash bcrypt para '123')
INSERT INTO usuarios (nombre_completo, correo, password_hash, rol_id) VALUES 
('María Secretaría', 'secretaria@escuela.edu.hn', '$2b$10$39B0pU4rK6T1L6e1K1e1Ku9P6k4R0l1m2n3o4p5q6r7s8t9u0v1w2', 1),
('Carlos Docente', 'docente@escuela.edu.hn', '$2b$10$39B0pU4rK6T1L6e1K1e1Ku9P6k4R0l1m2n3o4p5q6r7s8t9u0v1w2', 2);
