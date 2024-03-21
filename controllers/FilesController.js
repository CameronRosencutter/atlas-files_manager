const { validationResult } = require('express-validator');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');
const dbClient = require('../utils/db');

const FilesController = {
  putPublish: async (req, res) => {
    try {
      // Retrieve the user based on the token
      const user = await dbClient.users.findOne({ token: req.token });

      // If user not found, return Unauthorized error
      if (!user) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      // Find the file document based on the ID
      const file = await dbClient.files.findOne({ _id: req.params.id, user: user._id });

      // If file not found, return Not Found error
      if (!file) {
        return res.status(404).json({ error: 'Not found' });
      }

      // Update isPublic to true
      file.isPublic = true;
      await file.save();

      // Return the updated file document
      return res.status(200).json(file);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  putUnpublish: async (req, res) => {
    try {
      // Retrieve the user based on the token
      const user = await dbClient.users.findOne({ token: req.token });

      // If user not found, return Unauthorized error
      if (!user) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      // Find the file document based on the ID
      const file = await dbClient.files.findOne({ _id: req.params.id, user: user._id });

      // If file not found, return Not Found error
      if (!file) {
        return res.status(404).json({ error: 'Not found' });
      }

      // Update isPublic to false
      file.isPublic = false;
      await file.save();

      // Return the updated file document
      return res.status(200).json(file);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};

module.exports = FilesController;

// POST /files
const createFile = async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Retrieve user based on token
  const user = await dbClient.users.findById(req.user.id);
  if (!user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const { name, type, parentId = 0, isPublic = false, data } = req.body;

  // Validate required fields
  if (!name) {
    return res.status(400).json({ message: 'Missing name' });
  }

  if (!type || !['folder', 'file', 'image'].includes(type)) {
    return res.status(400).json({ message: 'Missing or invalid type' });
  }

  if ((type === 'file' || type === 'image') && !data) {
    return res.status(400).json({ message: 'Missing data' });
  }

  let parentFile;
  if (parentId !== 0) {
    parentFile = await dbClient.files.findById(parentId);
    if (!parentFile) {
      return res.status(400).json({ message: 'Parent not found' });
    }
    if (parentFile.type !== 'folder') {
      return res.status(400).json({ message: 'Parent is not a folder' });
    }
  }

  let localPath;
  if (type === 'file' || type === 'image') {
    const folderPath = process.env.FOLDER_PATH || '/tmp/files_manager';
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }
    const filename = uuidv4();
    localPath = path.join(folderPath, filename);
    const buffer = Buffer.from(data, 'base64');
    fs.writeFileSync(localPath, buffer);
  }

  const newFile = {
    userId: user._id,
    name,
    type,
    parentId,
    isPublic,
    localPath: localPath || null,
  };

  await newFile.save();

  return res.status(201).json(newFile);
}
