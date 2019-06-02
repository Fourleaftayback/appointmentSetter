const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const busboy = require("connect-busboy");
const busboyBodyParser = require("busboy-body-parser");
const helmet = require("helmet");
const compression = require("compression");

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
const daysOff = require("./routes/daysOff");

app.use(compression());

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("connected to database " + db))
  .catch(err => console.log("database connection failed " + err));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//testing
app.use(busboy());
app.use(busboyBodyParser());

app.use("/team", teamApi);
app.use("/team/appointment", appointmentApiTeam);
app.use("/user", userApi);
app.use("/appointment", appointmentApiClient);
app.use("/confirm", confirm);
app.use("/reset/user", userReset);
app.use("/reset/team", teamReset);
app.use("/daysoff", daysOff);

app.listen(port, () => console.log(`server connected on ${port}`));
