const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const app = express();
const port = process.env.PORT || 5000;
const db = process.env.DATABASE || "mongodb://localhost/test";

//import routes here

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("connected to database " + db))
  .catch(err => console.log("database connection failed " + err));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(port, () => console.log(`server connected on ${port}`));
