const { validationResult } = require('express-validator');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');
const User = require('../models/User');
const File = require('../models/File');

    // POST /files
  const createFile = async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
  return res.status(400).json({ errors: errors.array() });
  }
  
  // Retrieve user based on token
  const user = await User.findById(req.user.id);
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
  
  try {
  let parentFile;
  if (parentId !== 0) {
  parentFile = await File.findById(parentId);
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
  
  const newFile = new File({
  userId: user._id,
  name,
  type,
  parentId,
  isPublic,
  localPath: localPath || null,
  });
  
  await newFile.save();
  
  return res.status(201).json(newFile);
}
