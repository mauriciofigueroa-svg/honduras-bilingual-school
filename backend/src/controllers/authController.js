const authService = require('../services/authService');
const escuelaRepository = require('../repositories/escuelaRepository');

class AuthController {
  async login(req, res) {
    try {
      const { correo, password } = req.body;
      const resultado = await authService.login(correo, password);
      res.json(resultado);
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  }

  async registrarMatricula(req, res) {
    try {
      const { nombre, identidad, grado, telefono } = req.body;
      const usuarioId = req.usuario.id;
      const resultado = await escuelaRepository.registrarAlumnoYMatricula({ nombre, identidad, grado, telefono, usuarioId });
      res.status(201).json({ message: '¡Matrícula y alumno registrados con éxito en MySQL!', data: resultado });
    } catch (error) {
      res.status(500).json({ message: 'Error al registrar matrícula: ' + error.message });
    }
  }

  async registrarPago(req, res) {
    try {
      const { alumno_id, concepto, monto, metodo_pago } = req.body;
      const resultado = await escuelaRepository.registrarPago({ alumno_id, concepto, monto, metodo_pago });
      res.status(201).json({ message: '¡Pago procesado y guardado en caja exitosamente!', data: resultado });
    } catch (error) {
      res.status(500).json({ message: 'Error al procesar pago: ' + error.message });
    }
  }

  async obtenerClaseDocente(req, res) {
    try {
      const { gradeId, subjectCode } = req.params;
      
      const mapaGrados = {
        '1': '1er Grado',
        '2': '2do Grado',
        '3': '3er Grado',
        '4': '4to Grado',
        '5': '5to Grado',
        '6': '6to Grado',
        '7': '7mo Grado',
        '8': '8vo Grado'
      };

      const gradoTexto = mapaGrados[gradeId] || '3er Grado';
      const alumnosNotas = await escuelaRepository.obtenerCalificacionesPorGrado(gradoTexto, subjectCode);
      
      res.json({
        grado: gradoTexto,
        asignatura: subjectCode,
        alumnos: alumnosNotas
      });
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener datos del docente: ' + error.message });
    }
  }
}

module.exports = new AuthController();