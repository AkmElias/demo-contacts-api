const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

//app create
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(cors());

//conncet to mongodb database.
const db = require("./models");
const dbConfig = require("./config/db.config");

db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useNewTopology: true,
  })
  .then(() => {
    console.log("Successfully connected to monogoDB");
  })
  .catch((err) => {
    console.log(`Connection error: ${err}`);
    process.exit();
  });

//requests..
app.get("/", (req, res) => {
  res.json({ message: "Welcome to contacts-demo-applicaion!" });
});

//set PORT listening for requests..
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
