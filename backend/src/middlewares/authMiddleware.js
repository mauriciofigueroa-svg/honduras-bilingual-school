const jwt = require('jsonwebtoken');

function verificarToken(req, res, next) {
  const bearerHeader = req.headers['authorization'];
  if (!bearerHeader) {
    return res.status(403).json({ message: 'Token requerido' });
  }

  const token = bearerHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secreto_escuela_bilingue_2026');
    req.usuario = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token inválido o expirado' });
  }
}

module.exports = verificarToken;
