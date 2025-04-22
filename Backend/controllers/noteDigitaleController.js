const { NoteDigitale, Formation, User, Trace } = require('../db/models');

exports.createNote = async (req, res) => {
  const { userId, titre, content, formationId } = req.body;

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const formation = await Formation.findByPk(formationId);
    if (!formation) {
      return res.status(404).json({ message: 'Formation not found' });
    }

    const note = await NoteDigitale.create({
      titre,
      content,
      formationId,
      userId,
    });

    // Trace the note creation
    await Trace.create({
      userId,
      action: 'Create Note',
      model: 'NoteDigitale',
      data: {
        noteId: note.id,
        titre: note.titre,
        formationId,
      },
    });

    return res.status(201).json({
      message: 'Note created successfully',
      note,
    });
  } catch (error) {
    console.error('Error creating note:', error);
    return res.status(500).json({ message: 'Error creating note', error });
  }
};

exports.getNotesByFormation = async (req, res) => {
  const { formationId } = req.params;
  const { userId } = req.query;

  try {
    const notes = await NoteDigitale.findAll({
      where: { formationId, userId },
    });

    if (notes.length === 0) {
      return res.status(404).json({ message: 'No notes found for this formation' });
    }

    return res.status(200).json({ message: 'Notes found successfully', notes });
  } catch (error) {
    console.error('Error fetching notes:', error);
    return res.status(500).json({ message: 'Error fetching notes', error });
  }
};

exports.updateNote = async (req, res) => {
  const { noteId, titre, content, userId } = req.body;

  try {
    const note = await NoteDigitale.findByPk(noteId);
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    if (note.userId !== userId) {
      return res.status(403).json({ message: 'You cannot update this note' });
    }

    await note.update({ titre, content });

    // Trace the note update
    await Trace.create({
      userId,
      action: 'Update Note',
      model: 'NoteDigitale',
      data: {
        noteId: note.id,
        titre: note.titre,
        content: note.content,
      },
    });

    return res.status(200).json({ message: 'Note updated successfully', note });
  } catch (error) {
    console.error('Error updating note:', error);
    return res.status(500).json({ message: 'Error updating note', error });
  }
};

exports.deleteNote = async (req, res) => {
  const { noteId, userId } = req.params;

  try {
    const note = await NoteDigitale.findByPk(noteId);
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    if (note.userId !== userId) {
      return res.status(403).json({ message: 'You cannot delete this note' });
    }

    await note.destroy();

    // Trace the note deletion
    await Trace.create({
      userId,
      action: 'Delete Note',
      model: 'NoteDigitale',
      data: {
        noteId: note.id,
      },
    });

    return res.status(200).json({ message: 'Note deleted successfully' });
  } catch (error) {
    console.error('Error deleting note:', error);
    return res.status(500).json({ message: 'Error deleting note', error });
  }
};
