const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const app = express();
const port = process.env.PORT;
const db = process.env.DATABASE || "mongodb://localhost/test";

const teamApi = require("./routes/team");
const userApi = require("./routes/user");
const appointmentApiClient = require("./routes/appointmentClient");
const appointmentApiTeam = require("./routes/appointmentTeam");
const userReset = require("./routes/userReset");
const teamReset = require("./routes/teamReset");
const confirm = require("./routes/confirm");

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("connected to database " + db))
  .catch(err => console.log("database connection failed " + err));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/team", teamApi);
app.use("/team/appointment", appointmentApiTeam);
app.use("/user", userApi);
app.use("/appointment", appointmentApiClient);
app.use("/confirm", confirm);
app.use("/reset/user", userReset);
app.use("/reset/team", teamReset);

app.listen(port, () => console.log(`server connected on ${port}`));
