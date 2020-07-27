const mongoose = require("mongoose");

const Contact = mongoose.model(
  "Contact",
  new mongoose.Schema({
    email: String,
    number: String,
    people: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "People",
    },
  })
);

module.exports = Contact;
