import Note from '../models/Notes.js';
import Employee from '../models/Employee.js';

export const addNote = async (req, res) => {
  try {
    const { employeeId, note, visibleToEmployee } = req.body;

    if (!employeeId || !note) {
      return res.status(400).json({ error: 'Employee ID and note content are required' });
    }

    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    const newNote = new Note({ employeeId, note, visibleToEmployee });
    await newNote.save();
    res.status(201).json(newNote);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add note' });
  }
};

export const getNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ error: 'Note not found' });
    res.json(note);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch note' });
  }
};

export const getNotesByEmployeeId = async (req, res) => {
  try {
    const notes = await Note.find({ employeeId: req.params.employeeId });
    if (!notes.length) return res.status(404).json({ error: 'No notes found for this employee' });
    res.json(notes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch notes' });
  }
};

export const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch notes' });
  }
};

export const updateNote = async (req, res) => {
  try {
    const { note, visibleToEmployee } = req.body;

    if (!note) {
      return res.status(400).json({ error: 'Note content is required' });
    }

    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { note, visibleToEmployee },
      { new: true }
    );
    
    if (!updatedNote) return res.status(404).json({ error: 'Note not found' });
    res.json(updatedNote);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update note' });
  }
};