const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes/routes");
var connect = require("connect");

require("dotenv").config();

const app = express();
const mongoUrl = process.env.MONGO_URI;

const database = mongoose.connection;

mongoose.connect(mongoUrl);

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});

app.use(express.json());

app.use("/api", routes);

app.listen(5000, () => {
  console.log("listening on port " + 5000);
});
