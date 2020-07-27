const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;

db.people = require("./people.model");
db.contact = require("./contact.model");

module.exports = db;
