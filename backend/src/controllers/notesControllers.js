import Note from "../models/Note.js";

export async function getAllNotes(req, res) {
  try {
    const notes = await Note.find().sort({createdAt: -1});
    res.status(200).json(notes);
  } catch (err) {
    console.error("Error in getAllNotes");
    res.status(500).json({ message: "Internal server error", err });
  }
}

export async function getNoteById(req, res) {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: "note not found" });
    res.status(200).json(note);
  } catch (error) {
    console.error("Error in getNoteById controller");
    res.status(500).json({ message: "Internal server error", err });
  }
}

export async function createNote(req, res) {
  try {
    const { title, content } = req.body;
    const note = new Note({ title, content });
    const savedNote = await note.save();
    res.status(201).json(savedNote);
  } catch (error) {
    console.error("Error in createNote controller");
    res.status(500).json({ message: "Internal server error", err });
  }
}

export async function updateNote(req, res) {
  try {
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(req.params.id, {
      title,
      content,
    });
    if (!updateNote) {
      return res.status(404).json({ message: "note not found" });
    }
    res.status(201).json(updatedNote);
  } catch (error) {
    console.error("Error in updateNote controller");
    res.status(500).json({ message: "Internal server error", err });
  }
}

export async function deleteNote(req, res) {
  try {
    const { title, content } = req.body;
    const deleteNote = await Note.findByIdAndDelete(req.params.id, {
      title,
      content,
    });
    if (!deleteNote) {
      return res.status(404).json({ message: "note not found" });
    }
    res.status(200).json({ message: "note deleted successfully" });
  } catch (error) {
    console.error("Error in deleteNote controller");
    res.status(500).json({ message: "Internal server error", err });
  }
}

