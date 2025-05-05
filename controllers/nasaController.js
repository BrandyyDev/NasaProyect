const fetch = require('node-fetch');
const jwtUtils = require('../utils/jwtUtils'); 
const apiKey = process.env.NASA_API_KEY;

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
    // Si se envía una fecha única
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