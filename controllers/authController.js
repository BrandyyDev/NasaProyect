const userModel = require('../models/userModel');
const passwordUtils = require('../utils/passwordUtils');
const jwtUtils = require('../utils/jwtUtils');

async function registerUser(req, res) {
  console.log('[REGISTER] Inicio de registro de usuario');
  const { email, password } = req.body;

  if (!email || !password) {
    console.log('[REGISTER] Datos faltantes: email o password');
    return res.status(400).json({ message: 'El correo electrónico y la contraseña son obligatorios.' });
  }

  try {
    const existingUser = await userModel.getUserByEmail(email);
    if (existingUser) {
      console.log(`[REGISTER] Usuario ya existente: ${email}`);
      return res.status(409).json({ message: 'El usuario con este correo electrónico ya existe.' });
    }

    const hashedPassword = await passwordUtils.hashPassword(password);
    const newUser = await userModel.createUser(email, hashedPassword);
    const token = jwtUtils.generateToken({ userId: newUser.id, email: newUser.email });

    console.log(`[REGISTER] Usuario registrado exitosamente: ${email}`);
    res.status(201).json({ message: 'Usuario registrado exitosamente', token });
  } catch (error) {
    console.error('[REGISTER] Error al registrar el usuario:', error);
    res.status(500).json({ message: 'Error al registrar el usuario.' });
  }
}

async function loginUser(req, res) {
  console.log('[LOGIN] Inicio de sesión');
  const { email, password } = req.body;
  if (!email || !password) {
    console.log('[LOGIN] Datos faltantes: email o password');
    return res.status(400).json({ message: 'El correo electrónico y la contraseña son obligatorios.' });
  }

  try {
    const user = await userModel.getUserByEmail(email);
    if (!user) {
      console.log(`[LOGIN] Usuario no encontrado: ${email}`);
      return res.status(401).json({ message: 'Credenciales inválidas.' });
    }

    const isPasswordValid = await passwordUtils.comparePassword(password, user.password_hash);
    if (!isPasswordValid) {
      console.log(`[LOGIN] Contraseña inválida para el usuario: ${email}`);
      return res.status(401).json({ message: 'Credenciales inválidas.' });
    }

    const token = jwtUtils.generateToken({ userId: user.id, email: user.email });
    console.log(`[LOGIN] Inicio de sesión exitoso para el usuario: ${email}`);
    res.json({ message: 'Inicio de sesión exitoso', token, user: { id: user.id, email: user.email } });
  } catch (error) {
    console.error('[LOGIN] Error al iniciar sesión:', error);
    res.status(500).json({ message: 'Error al iniciar sesión.' });
  }
}

async function logoutUser(req, res) {
  console.log('[LOGOUT] Solicitud de cierre de sesión');
  res.clearCookie('token');
  console.log('[LOGOUT] Token limpiado. Cierre de sesión exitoso.');
  return res.status(200).json({ message: 'Cierre de sesión exitoso' });
}

async function getProtectedData(req, res) {
  console.log('[PROTECTED] Acceso a datos protegidos para el usuario:', req.user && req.user.email);
  res.json({ message: 'Estos son datos protegidos', user: req.user });
}

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getProtectedData,
};