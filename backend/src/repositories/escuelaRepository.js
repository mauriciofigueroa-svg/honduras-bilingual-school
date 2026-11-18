const pool = require('../config/db');

class EscuelaRepository {
  async registrarAlumnoYMatricula(data) {
    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();

      // 1. Insertar alumno
      const [resultAlumno] = await connection.query(
        'INSERT INTO alumnos (nombre_completo, identidad, grado_actual, telefono_tutor) VALUES (?, ?, ?, ?)',
        [data.nombre, data.identidad, data.grado, data.telefono]
      );
      const alumnoId = resultAlumno.insertId;

      // 2. Insertar matrícula asociada al usuario de secretaría
      await connection.query(
        'INSERT INTO matriculas (alumno_id, grado, registrado_por) VALUES (?, ?, ?)',
        [alumnoId, data.grado, data.usuarioId]
      );

      await connection.commit();
      connection.release();
      return { alumnoId, ...data };
    } catch (error) {
      await connection.rollback();
      connection.release();
      throw error;
    }
  }

  async registrarPago(data) {
    const [result] = await pool.query(
      'INSERT INTO pagos (alumno_id, concepto, monto, metodo_pago) VALUES (?, ?, ?, ?)',
      [data.alumno_id, data.concepto, data.monto, data.metodo_pago || 'Efectivo']
    );
    return { id: result.insertId, ...data };
  }

  async obtenerCalificacionesPorGrado(grado, asignatura) {
    const [rows] = await pool.query(
      `SELECT a.id AS id, a.nombre_completo AS nombre_completo, 
              IFNULL(c.asignatura, ?) AS asignatura, 
              IFNULL(c.parcial, 'III Parcial') AS parcial, 
              IFNULL(c.nota, 0.00) AS nota 
       FROM alumnos a 
       LEFT JOIN calificaciones c ON a.id = c.alumno_id AND c.asignatura = ?
       WHERE a.grado_actual = ?`,
      [asignatura, asignatura, grado]
    );
    return rows;
  }
}

module.exports = new EscuelaRepository();