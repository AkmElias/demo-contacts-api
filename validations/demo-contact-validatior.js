const db = require("../models");
const people = db.people;
const contacts = db.contacts;

verifyDuplicateName = (req, res, next) => {
  people
    .findOne({
      name: req.body.name,
    })
    .exec((err, people) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (people) {
        res.status(400).send({ message: "Failed! name allready in use!" });
        return;
      }
      next();
    });
};

const validators = {
  verifyDuplicateName,
};

module.exports = validators;
