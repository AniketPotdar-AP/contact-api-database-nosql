const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const dotenv = require("dotenv");
const port = process.env.PORT || 3000;
const dbURI =
  "mongodb://user:zRpZV2HfzyEtDW6s@ac-wk0hijl-shard-00-00.mzwtfcv.mongodb.net:27017,ac-wk0hijl-shard-00-01.mzwtfcv.mongodb.net:27017,ac-wk0hijl-shard-00-02.mzwtfcv.mongodb.net:27017/?ssl=true&replicaSet=atlas-12xsaw-shard-0&authSource=admin&retryWrites=true&w=majority&appName=contactCrud";

app.use(express.static("public"));
app.use(express.json());
app.use(cors());
app.use(cookieParser());
dotenv.config();

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(
    () => console.log("Database Connected"),
    app.listen(port, () => {
      console.log(`Running on port ${port}`);
    })
  )
  .catch((err) => console.log(err));

const user = require("./api/routes/user");
const contact = require("./api/routes/contact");

app.use("/", user);
app.use("/", contact);
