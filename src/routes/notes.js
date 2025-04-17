const express = require("express");
const { body } = require("express-validator");
const noteController = require("../controllers/noteController");

const router = express.Router();

// Validaciones para las notas
const noteValidations = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("El título es obligatorio")
    .isLength({ max: 100 })
    .withMessage("El título no puede tener más de 100 caracteres"),
  body("content").trim().notEmpty().withMessage("El contenido es obligatorio"),
];

// Obtener todas las notas
router.get("/", noteController.getNotes);

// Crear una nueva nota
router.post("/", noteValidations, noteController.createNote);

// Actualizar una nota
router.put("/:id", noteValidations, noteController.updateNote);

// Obtener todas las etiquetas únicas
router.get("/tags", noteController.getAllTags);

// Filtrar notas por etiqueta
router.get("/tag/:tag", noteController.getNotesByTag);

module.exports = router;
