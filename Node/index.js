require("dotenv").config();
const express = require("express");
const cors = require("cors");
const apiRoutes = require("./routes/indexRoutes");

const app = express();
app.use(cors());
app.use(express.json());

// Utiliza el enrutador centralizado para organizar tus API
app.use("/api", apiRoutes);
app.get("/", (req, res) => res.send("Servidor funcionando"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));