/* eslint-disable linebreak-style */
/* eslint-disable comma-dangle */
/* eslint-disable linebreak-style */
/* eslint-disable prefer-destructuring */
/* eslint-disable linebreak-style */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable linebreak-style */
/* eslint-disable import/newline-after-import */
/* eslint-disable linebreak-style */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FileSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  name: { type: String, required: true },
  type: { type: String, required: true, enum: ['folder', 'file', 'image'] },
  isPublic: { type: Boolean, default: false },
  parentId: { type: mongoose.Schema.Types.ObjectId, default: 0 },
  localPath: { type: String }
});

module.exports = mongoose.model('File', FileSchema);
