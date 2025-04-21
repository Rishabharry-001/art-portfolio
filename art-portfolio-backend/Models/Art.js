const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  username: String,
  text: String,
  createdAt: { type: Date, default: Date.now }
});

const artSchema = new mongoose.Schema({
  title: String,
  imageUrl: String,
  description: String,
  comments: [commentSchema]
});

module.exports = mongoose.model('Art', artSchema);
