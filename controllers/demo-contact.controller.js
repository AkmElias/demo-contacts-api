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

exports.contacts = (req, res) => {
  const peopleId = req.params.id;

  //checking for valid people id
  People.findById({ _id: peopleId }).exec((err, ppl) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (!ppl) {
      return res.status(404).send({ message: "People Not found." });
    }
    //checking if the contacts allready added for this People
    Contact.findOne({ people: peopleId }, (err, people) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (people) {
        res.send({ message: "contacts allready added for this People." });
        return;
      }

      const contact = new Contact({
        email: req.body.email,
        number: req.body.number,
        people: peopleId,
      });

      contact.save((err, contact) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        res.status(201).send({
          message: "Contacts added to the People with _id: " + peopleId,
        });
      });
    });
  });
};

exports.search = (req, res) => {
  const name = req.query.name;
  const details = {};
  People.findOne({ name: name }, (err, people) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (!people) {
      res.status(404).send("People not found.");
      return;
    }
    if (people) {
      details.people = people;
      details.contacts = "No contacts found.";
      Contact.findOne({ people: details.people._id }, (err, contact) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        if (!contact) {
          res.status(200).send(details);
        }
        if (contact) {
          details.contacts = contact;
          res.status(200).send(details);
        }
      });
    }
  });
};
