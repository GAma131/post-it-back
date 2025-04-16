require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/database");
const errorHandler = require("./middlewares/errorHandler");
const notesRoutes = require("./routes/notes");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/notes", notesRoutes);

// Ruta raíz
app.get("/", (req, res) => {
  res.json({ message: "API de Notas funcionando correctamente" });
});

// Middleware de error (debe estar después de las rutas)
app.use(errorHandler);

// Conexión a MongoDB y arranque del servidor
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
  } catch (error) {
    console.error("Error al iniciar el servidor:", error);
    process.exit(1);
  }
};

startServer();

// Manejo de errores no controlados
process.on("unhandledRejection", (err) => {
  console.error("Error no controlado:", err);
  process.exit(1);
});
