const userModel = require('../models/userModel');
const passwordUtils = require('../utils/passwordUtils');
const jwtUtils = require('../utils/jwtUtils');

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Registra un nuevo usuario
 *     description: Crea un usuario con email y contraseña y devuelve un token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: usuario@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       201:
 *         description: "Usuario registrado exitosamente"
 *       400:
 *         description: "Datos faltantes: email o password"
 *       409:
 *         description: "El usuario con este correo electrónico ya existe."
 *       500:
 *         description: "Error al registrar el usuario."
 */
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
    res.status(201).json({ message: 'Usuario registrado exitosamente', token });
  } catch (error) {
    console.error('Error al registrar el usuario:', error);
    res.status(500).json({ message: 'Error al registrar el usuario.' });
  }
}

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Inicio de sesión de usuario
 *     description: Verifica las credenciales y devuelve un token junto con los datos del usuario.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: usuario@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: "Inicio de sesión exitoso"
 *       400:
 *         description: "Datos faltantes: email o password"
 *       401:
 *         description: "Credenciales inválidas."
 *       500:
 *         description: "Error al iniciar sesión."
 */
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

/**
 * @swagger
 * /logout:
 *   post:
 *     summary: Cierre de sesión
 *     description: Limpia el token y cierra la sesión del usuario.
 *     responses:
 *       200:
 *         description: "Cierre de sesión exitoso."
 */
async function logoutUser(req, res) {
  res.clearCookie('token');
  return res.status(200).json({ message: 'Cierre de sesión exitoso' });
}

/**
 * @swagger
 * /protected:
 *   get:
 *     summary: Acceso a datos protegidos
 *     description: Devuelve datos protegidos solo para usuarios autenticados.
 *     responses:
 *       200:
 *         description: "Datos protegidos obtenidos exitosamente."
 */
async function getProtectedData(req, res) {
  res.json({ message: 'Estos son datos protegidos', user: req.user });
}

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getProtectedData,
};