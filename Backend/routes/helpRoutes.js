// routes/helpRoutes.js
const express = require('express');
const router = express.Router();
const helpController = require('../controllers/helpController');

router.get('/page/:page', helpController.getHelpByPage);
router.post('/', helpController.createHelp);
router.get('/', helpController.getAllHelps);
router.get('/:id', helpController.getHelpById);
router.put('/:id', helpController.updateHelp);
router.delete('/:id', helpController.deleteHelp);


module.exports = router;
