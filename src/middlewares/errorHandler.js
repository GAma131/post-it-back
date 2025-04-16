// Middleware para capturar errores
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  // Errores de Mongoose
  if (err.name === "CastError") {
    return res.status(400).json({
      message: "Formato de ID inválido",
    });
  }

  if (err.name === "ValidationError") {
    return res.status(400).json({
      message: Object.values(err.errors)
        .map((val) => val.message)
        .join(", "),
    });
  }

  // Error genérico
  res.status(500).json({
    message: "Error interno del servidor",
  });
};

module.exports = errorHandler;
