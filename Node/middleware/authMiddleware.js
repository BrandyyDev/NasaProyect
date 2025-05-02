const jwtUtils = require('../utils/jwtUtils');

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (token == null) {
    return res.sendStatus(401); // No autorizado
  }

  const user = jwtUtils.verifyToken(token);
  if (user) {
    req.user = user; // Adjunta la información del usuario al request
    next();
  } else {
    return res.sendStatus(403); // Prohibido (token inválido)
  }
}

module.exports = authenticateToken;