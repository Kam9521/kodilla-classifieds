const mongoose = require("mongoose");

const adSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 50,
    trim: true,
  },
  content: {
    type: String,
    required: true,
    minlength: 20,
    maxlength: 1000,
    trim: true,
  },
  publicationDate: {
    type: Date,
    default: Date.now,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  location: {
    type: String,
    required: true,
    trim: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Ad", adSchema);
