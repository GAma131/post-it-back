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
    // Crear fechas en formato ISO string
    const now = new Date().toISOString();

    const newNote = new Note({
      title: req.body.title,
      content: req.body.content,
      tags: req.body.tags,
      createdAt: now,
      updatedAt: now,
    });

    const savedNote = await newNote.save();
    res.status(201).json(savedNote);
  } catch (error) {
    console.error("Error al crear nota:", error);
    res.status(500).json({ message: "Error al crear la nota" });
  }
};

// Actualizar una nota
exports.updateNote = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { id } = req.params;
    const updateData = {
      title: req.body.title,
      content: req.body.content,
      tags: req.body.tags,
      updatedAt: new Date().toISOString(),
    };

    const updatedNote = await Note.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedNote) {
      return res.status(404).json({ message: "Nota no encontrada" });
    }

    res.status(200).json(updatedNote);
  } catch (error) {
    console.error("Error al actualizar nota:", error);
    res.status(500).json({ message: "Error al actualizar la nota" });
  }
};

// Obtener todas las etiquetas únicas
exports.getAllTags = async (req, res) => {
  try {
    // Encuentra todas las notas y extrae solo el campo tags
    const result = await Note.find().distinct("tags");

    // Filtra para eliminar cualquier valor null, undefined o vacío
    const tags = result.filter((tag) => tag && tag.trim() !== "");

    res.status(200).json(tags);
  } catch (error) {
    console.error("Error al obtener etiquetas:", error);
    res.status(500).json({ message: "Error al obtener las etiquetas" });
  }
};

// Filtrar notas por etiqueta
exports.getNotesByTag = async (req, res) => {
  try {
    const { tag } = req.params;

    // Busca notas que contengan la etiqueta especificada
    const notes = await Note.find({ tags: tag }).sort({ updatedAt: -1 });

    res.status(200).json(notes);
  } catch (error) {
    console.error("Error al filtrar notas por etiqueta:", error);
    res
      .status(500)
      .json({ message: "Error al filtrar las notas por etiqueta" });
  }
};
