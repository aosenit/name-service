const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes/routes");

require("dotenv").config();

const app = express();
const password = process.env.MONGO_PASSWORD;
const mongoUrl = `mongodb+srv://project-one:${password}@cluster-one.9qudv0t.mongodb.net/?retryWrites=true&w=majority`;
mongoose.connect(mongoUrl);
const database = mongoose.connection;

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
