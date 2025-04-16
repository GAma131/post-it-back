const Note = require("../models/Note");
const { validationResult } = require("express-validator");

// Obtener todas las notas
exports.getNotes = async (req, res) => {
  try {
    const notes = await Note.find().sort({ updatedAt: -1 });
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error al obtener notas:", error);
    res.status(500).json({ message: "Error al obtener las notas" });
  }
};

// Crear una nueva nota
exports.createNote = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const newNote = new Note({
      title: req.body.title,
      content: req.body.content,
      tags: req.body.tags,
    });

    const savedNote = await newNote.save();
    res.status(201).json(savedNote);
  } catch (error) {
    console.error("Error al crear nota:", error);
    res.status(500).json({ message: "Error al crear la nota" });
  }
};
