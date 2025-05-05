const poolConnection = require('../config/database'); 

async function createUser(email, passwordHash) {
  try {
    const result = await poolConnection.query(
      'INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id, email',
      [email, passwordHash]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

async function getUserByEmail(email) {
  try {
    const result = await poolConnection.query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0];
  } catch (error) {
    console.error('Error getting user by email:', error);
    throw error;
  }
}

async function getUserById(id) {
  try {
    const result = await poolConnection.query('SELECT id, email FROM users WHERE id = $1', [id]);
    return result.rows[0];
  } catch (error) {
    console.error('Error getting user by id:', error);
    throw error;
  }
}

module.exports = {
  createUser,
  getUserByEmail,
  getUserById,
};