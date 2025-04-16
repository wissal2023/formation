// controllers/videoController.js
const db = require('../db/models');
const Video = db.Video;



// Get all Videos
exports.getAllVideos = async (req, res) => {
  try {
    const videos = await Video.findAll();
    res.status(200).json(videos);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get one Video by ID
exports.getVideoById = async (req, res) => {
  try {
    const video = await Video.findByPk(req.params.id);
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }
    res.status(200).json(video);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a Video
exports.updateVideo = async (req, res) => {
  try {
    const video = await Video.findByPk(req.params.id);
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    await video.update(req.body);
    res.status(200).json(video);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Soft Delete a Video
exports.deleteVideo = async (req, res) => {
  try {
    const video = await Video.findByPk(req.params.id);
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    await video.destroy(); // Soft delete
    res.status(200).json({ message: 'Video deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
