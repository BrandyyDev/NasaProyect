const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET 
function generateToken(payload) {
  return jwt.sign(payload, jwtSecret, { expiresIn: '1h' });
}

function verifyToken(token) {
  try {
    return jwt.verify(token, jwtSecret);
  } catch (error) {
    return null;
  }
}

module.exports = {
  generateToken,
  verifyToken,
};