const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser")
const app = express(); 
const dotenv = require('dotenv')
const port = process.env.PORT || 3000;
const dbURI = "mongodb+srv://user:9CMLHeXvdwbd6sYd@contactcrud.ccdwvgc.mongodb.net/?retryWrites=true&w=majority";

app.use(express.static("public"));
app.use(express.json());
app.use(cors());
app.use(cookieParser())
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
