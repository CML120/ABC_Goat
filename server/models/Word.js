const mongoose = require('mongoose');

const wordSchema = new mongoose.Schema({
  word: String,
  level: Number,
});

const Word = mongoose.model('Word', wordSchema);

module.exports = Word;