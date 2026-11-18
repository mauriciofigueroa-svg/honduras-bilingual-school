const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

// Autenticación
router.post('/auth/login', authController.login);

// Rutas protegidas de Secretaría
router.post('/matriculas', authMiddleware, authController.registrarMatricula);
router.post('/pagos', authMiddleware, authController.registrarPago);

// Rutas protegidas de Docente
router.get('/docente/clases/:gradeId/:subjectCode', authMiddleware, authController.obtenerClaseDocente);

module.exports = router;
