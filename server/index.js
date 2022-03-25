require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Person = require("./modules/Person.js");
const port = 3000;
const personRoutes = require("./routes.js");

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());
app.get("/", async (req, res) => {
  try {
    const people = await Person.find();
    res.status(200).json({ people });
    return;
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;

mongoose
  .connect(
    `mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.ewfv7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(port, () => {
      console.log(`server is running at port:${port}`);
    });
  })
  .catch((err) => console.log(err));

app.use("/person", personRoutes);
