// controllers/FilesController.js

const fs = require('fs');
const path = require('path');
const uuid = require('uuid');
const { validationResult } = require('express-validator');
const { File } = require('../models/File'); // Assuming you have a File model

// POST /files controller method
exports.postUpload = async (req, res) => {
  // Validate incoming data
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // Retrieve user ID from authentication token (assuming it's decoded and available in req.user)
    const userId = req.user.id; // Adjust this based on your authentication setup

    // Extract file data from request body
    const { name, type, parentId, isPublic, data } = req.body;

    // Validate required fields
    if (!name) {
      return res.status(400).json({ error: 'Missing name' });
    }
    if (!type || !['folder', 'file', 'image'].includes(type)) {
      return res.status(400).json({ error: 'Missing type or invalid type' });
    }
    if ((type === 'file' || type === 'image') && !data) {
      return res.status(400).json({ error: 'Missing data' });
    }

    // Handle parentId validation
    if (parentId) {
      const parentFile = await File.findById(parentId);
      if (!parentFile) {
        return res.status(400).json({ error: 'Parent not found' });
      }
      if (parentFile.type !== 'folder') {
        return res.status(400).json({ error: 'Parent is not a folder' });
      }
    }

    // Prepare file document to save in DB
    const fileData = {
      userId,
      name,
      type,
      isPublic: isPublic || false,
      parentId: parentId || 0,
    };

    // Handle file data storage
    if (type === 'file' || type === 'image') {
      // Determine storage folder path
      const folderPath = process.env.FOLDER_PATH || '/tmp/files_manager';
      const filePath = path.join(folderPath, uuid.v4());

      // Decode and write file content to disk
      const fileBuffer = Buffer.from(data, 'base64');
      fs.writeFileSync(filePath, fileBuffer);

      // Add localPath to fileData for database entry
      fileData.localPath = filePath;
    }

    // Create new file document in DB
    const newFile = await File.create(fileData);

    // Return success response with created file details
    res.status(201).json(newFile);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
};
