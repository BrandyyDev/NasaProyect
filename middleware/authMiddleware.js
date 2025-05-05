const jwtUtils = require('../utils/jwtUtils');

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; 

  if (token == null) {
    return res.sendStatus(401); 
  }

  const user = jwtUtils.verifyToken(token);
  if (user) {
    req.user = user; 
    next();
  } else {
    return res.sendStatus(403); 
  }
}

module.exports = authenticateToken;