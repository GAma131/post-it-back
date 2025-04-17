const Note = require("../models/Note");
const { validationResult } = require("express-validator");

// Función para convertir fechas a string
const formatNote = (note) => {
  const noteObj = note.toObject();
  if (noteObj.createdAt) {
    noteObj.createdAt = noteObj.createdAt.toISOString();
  }
  if (noteObj.updatedAt) {
    noteObj.updatedAt = noteObj.updatedAt.toISOString();
  }
  return noteObj;
};

// Obtener todas las notas
exports.getNotes = async (req, res) => {
  try {
    const notes = await Note.find().sort({ updatedAt: -1 });
    // Convertir fechas a string para todas las notas
    const formattedNotes = notes.map((note) => formatNote(note));
    res.status(200).json(formattedNotes);
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
    // Convertir fechas a string antes de enviar la respuesta
    const formattedNote = formatNote(savedNote);
    res.status(201).json(formattedNote);
  } catch (error) {
    console.error("Error al crear nota:", error);
    res.status(500).json({ message: "Error al crear la nota" });
  }
};
