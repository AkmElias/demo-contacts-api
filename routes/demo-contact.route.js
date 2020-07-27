const controller = require("../controllers/demo-contact.controller");
const verifyDuplicateName = require("../validations/demo-contact-validatior");

module.exports = function (app) {
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "Authorization, Content-Type, x-access-token, Accept, Origin"
    );
    next();
  });

  app.post("/api/people", verifyDuplicateName, controller.people);
};
