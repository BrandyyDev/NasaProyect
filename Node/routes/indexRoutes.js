const express = require("express");
const router = express.Router();

const authRoutes = require("./authRoutes");
const protectedRoutes = require("./protectedRoutes");
const nasaRoutes = require("./nasaRoutes");

// Organiza tus rutas y agrúpalas según su funcionalidad
router.use("/", authRoutes);
router.use("/", protectedRoutes);
router.use("/nasa", nasaRoutes);


module.exports = router;