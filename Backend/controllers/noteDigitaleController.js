const db = require('../db/models');
const NoteDigitale = db.NoteDigitale;

module.exports = {
  // CREATE
  async create(req, res) {
    try {
      const { titre, formationId } = req.body;

      const note = await NoteDigitale.create({ titre, formationId });
      res.status(201).json(note);
    } catch (error) {
      res.status(500).json({ message: 'Error creating note', error });
    }
  },

  // READ ALL
  async findAll(req, res) {
    try {
      const notes = await NoteDigitale.findAll({
        include: ['Formation']
      });
      res.status(200).json(notes);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching notes', error });
    }
  },

  // READ ONE
  async findOne(req, res) {
    try {
      const note = await NoteDigitale.findByPk(req.params.id);
      if (!note) return res.status(404).json({ message: 'Note not found' });

      res.status(200).json(note);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching note', error });
    }
  },

  // UPDATE
  async update(req, res) {
    try {
      const { titre } = req.body;
      const note = await NoteDigitale.findByPk(req.params.id);

      if (!note) return res.status(404).json({ message: 'Note not found' });

      await note.update({ titre });
      res.status(200).json(note);
    } catch (error) {
      res.status(500).json({ message: 'Error updating note', error });
    }
  },

  // DELETE
  async delete(req, res) {
    try {
      const note = await NoteDigitale.findByPk(req.params.id);
      if (!note) return res.status(404).json({ message: 'Note not found' });

      await note.destroy(); // soft delete (paranoid)
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: 'Error deleting note', error });
    }
  }
};
