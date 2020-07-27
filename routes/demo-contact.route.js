const apiController = require("../controllers/demo-contact.controller");
const validators = require("../validations/demo-contact-validatior");
const { body, validationResult } = require("express-validator");

module.exports = function (app) {
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "Authorization, Content-Type, x-access-token, Accept, Origin"
    );
    next();
  });

  app.post("/api/people", validators.verifyDuplicateName, apiController.people);
  app.post(
    "/api/people/:id/contacts",
    [body("email").isEmail()],
    apiController.contacts
  );
};
