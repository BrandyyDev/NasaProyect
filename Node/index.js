// filepath: c:\Users\xbox-\Documents\Proyectos\NasaProyect\Node\index.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const apiRoutes = require("./routes/indexRoutes");
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const app = express();

app.use(cors());
app.use(express.json());

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Technical API',
      version: '1.0.0',
      description: 'Documentación de APIs',
    },
    servers: [
      {
        url:  'https://nasa-backend-production.up.railway.app/api', 
      },
    ],
  },
  apis: ['./routes/*.js', './controllers/*.js'], 
};

const specs = swaggerJsdoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use("/api", apiRoutes);
app.get("/", (req, res) => res.send("Servidor funcionando"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));