const express = require("express");
const app = express();
require("dotenv").config();

app.use(express());

let port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.json({ message: "hello!" });
});

app.listen(port, () => {
  console.log(`running on ${port}`);
});
