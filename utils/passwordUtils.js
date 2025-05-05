const bcrypt = require('bcrypt');
const saltRounds = 10; 

async function hashPassword(password) {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(password, salt);
  } catch (error) {
    console.error('Error hashing password:', error);
    throw error;
  }
}

async function comparePassword(plainPassword, hashedPassword) {
  try {
    return await bcrypt.compare(plainPassword, hashedPassword);
  } catch (error) {
    console.error('Error comparing password:', error);
    throw error;
  }
}

module.exports = {
  hashPassword,
  comparePassword,
};