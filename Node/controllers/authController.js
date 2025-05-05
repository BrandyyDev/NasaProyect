const userModel = require('../models/userModel');
const passwordUtils = require('../utils/passwordUtils');
const jwtUtils = require('../utils/jwtUtils');

async function registerUser(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'El correo electrónico y la contraseña son obligatorios.' });
  }

  try {
    const existingUser = await userModel.getUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ message: 'El usuario con este correo electrónico ya existe.' });
    }

    const hashedPassword = await passwordUtils.hashPassword(password);
    const newUser = await userModel.createUser(email, hashedPassword);

    const token = jwtUtils.generateToken({ userId: newUser.id, email: newUser.email });
    res.status(201).json({ message: 'Usuario registrado exitosamente' });
  } catch (error) {
    console.error('Error al registrar el usuario:', error);
    res.status(500).json({ message: 'Error al registrar el usuario.' });
  }
}

async function loginUser(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'El correo electrónico y la contraseña son obligatorios.' });
  }

  try {
    const user = await userModel.getUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: 'Credenciales inválidas.' });
    }

    const isPasswordValid = await passwordUtils.comparePassword(password, user.password_hash);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Credenciales inválidas.' });
    }

    const token = jwtUtils.generateToken({ userId: user.id, email: user.email });
    res.json({ message: 'Inicio de sesión exitoso', token, user: { id: user.id, email: user.email } });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ message: 'Error al iniciar sesión.' });
  }
}

async function logoutUser(req, res) {

  res.clearCookie('token');

  return res.status(200).json({ message: 'Cierre de sesión exitoso' });
}


async function getProtectedData(req, res) {

  res.json({ message: 'Estos son datos protegidos', user: req.user });
}

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getProtectedData,
};