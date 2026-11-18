const express = require('express');
const cors = require('cors');
require('dotenv').config();

const apiRoutes = require('./routes/apiRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.formatErrors = true;
app.use(cors());
app.use(express.json());

// Montaje de Rutas en Capas
app.use('/api', apiRoutes);

app.get('/', (req, res) => {
  res.json({
    mensaje: 'Servidor Escuela Bilingüe Honduras - Arquitectura de 5 Capas Activo',
    endpoints: {
      login: 'POST /api/auth/login',
      matriculas: 'POST /api/matriculas',
      pagos: 'POST /api/pagos',
      docente: 'GET /api/docente/clases/:gradeId/:subjectCode'
    }
  });
});

app.listen(PORT, () => {
  console.log(`Servidor Honduras Bilingual Academy corriendo en puerto ${PORT}`);
});
