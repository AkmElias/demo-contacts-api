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

  //1st api
  app.post("/api/people", validators.verifyDuplicateName, apiController.people);

  //2nd api
  app.post(
    "/api/people/:id/contacts",
    body("email").isEmail(),
    apiController.contacts
  );

  //3rd api for getting details of a specific people
  app.get("/api/contacts", apiController.search);
};
