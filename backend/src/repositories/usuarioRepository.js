const pool = require('../config/db');

class UsuarioRepository {
  async obtenerPorCorreo(correo) {
    const [rows] = await pool.query('SELECT * FROM usuarios WHERE correo = ?', [correo]);
    return rows[0];
  }

  async obtenerPorId(id) {
    const [rows] = await pool.query('SELECT id, nombre_completo, correo, rol_id FROM usuarios WHERE id = ?', [id]);
    return rows[0];
  }
}

module.exports = new UsuarioRepository();
