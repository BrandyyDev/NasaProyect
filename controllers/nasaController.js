const fetch = require('node-fetch');
const jwtUtils = require('../utils/jwtUtils'); 
const apiKey = process.env.NASA_API_KEY;

/**
 * @swagger
 * /nasa/apod:
 *   get:
 *     summary: Obtiene la imagen o video del día de la NASA (APOD)
 *     description: Devuelve los datos de la APOD de la NASA para una fecha específica o un rango de fechas. Se requiere autenticación mediante JWT en el header Authorization.
 *     parameters:
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *         description: Fecha específica en formato YYYY-MM-DD.
 *       - in: query
 *         name: start_date
 *         schema:
 *           type: string
 *         description: Fecha de inicio para obtener un rango (formato YYYY-MM-DD).
 *       - in: query
 *         name: end_date
 *         schema:
 *           type: string
 *         description: Fecha final para obtener un rango (formato YYYY-MM-DD).
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Datos de la APOD obtenidos exitosamente.
 *       401:
 *         description: Acceso no permitido o token inválido/expirado.
 *       500:
 *         description: Error al obtener datos del APOD de la NASA.
 */
async function getApod(req, res) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'Acceso no permitido' });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: 'Acceso no permitido' });
  }

  try {
    jwtUtils.verifyToken(token);
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido o expirado.' });
  }

  const { date, start_date, end_date } = req.query;
  let apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;

  if (start_date && end_date) {
    apiUrl += `&start_date=${start_date}&end_date=${end_date}`;
  } else if (date) {
    apiUrl += `&date=${date}`;
  }

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      console.error(`Error en la API APOD de NASA: ${response.status}`);
      return res.status(response.status).json({ message: 'Error al obtener datos del APOD de NASA.' });
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error al obtener el APOD de NASA:', error);
    res.status(500).json({ message: 'Error al obtener datos del APOD de NASA.' });
  }
}

module.exports = {
  getApod,
};