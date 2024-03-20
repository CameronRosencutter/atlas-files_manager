// routes/index.js

const express = require('express');
const AppController = require('../controllers/AppController');
const UsersController = require('../controllers/UsersController');
const FilesController = require('../controllers/FilesController');

const router = express.Router();

router.get('/status', AppController.getStatus);
router.get('/stats', AppController.getStats);
router.post('/users', UsersController.postNew);

router.post('/files', FilesController.postUpload);
// GET /files/:id => FilesController.getShow
router.get('/files/:id', FilesController.getShow);

// GET /files => FilesController.getIndex
router.get('/files', FilesController.getIndex);

// PUT /files/:id/publish => FilesController.putPublish
router.put('/files/:id/publish', FilesController.putPublish);

// PUT /files/:id/unpublish => FilesController.putUnpublish
router.put('/files/:id/unpublish', FilesController.putUnpublish);

module.exports = router;
