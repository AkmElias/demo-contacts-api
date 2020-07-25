const mongoose = require("mongoose");

const People = mongoose.model(
  "People",
  new mongoose.Schema({
    name: String,
    age: Number,
    height: Number,
  })
);
