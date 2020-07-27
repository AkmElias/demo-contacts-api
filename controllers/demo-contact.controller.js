let bcrypt = require("bcryptjs");

const db = require("../models");

const People = db.people;
const Contact = db.contact;

exports.people = (req, res) => {
  const people = new People({
    name: req.body.name,
    age: req.body.age,
    height: req.body.height,
  });
  people.save((err, people) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.status(201).send({ message: "People added with _id: " + people.id });
  });
};
