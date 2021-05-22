const express = require("express");
const fs = require("fs");
const cors = require("cors");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);
require("dotenv").config();

let port = process.env.PORT || 3000;
const app = express();
app.use(cors());

const { uploadFile, getFileStream } = require("./s3");

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

app.get("/", (req, res) => {
  res.json({ message: "hello!" });
});

app.get("/songs/:key", (req, res) => {
  console.log(req.params);
  const key = req.params.key;
  const readStream = getFileStream(key);

  readStream.pipe(res);
});

app.post("/songs", upload.single("song"), async (req, res) => {
  const file = req.file;

  const result = await uploadFile(file);
  await unlinkFile(file.path);
  var songkey = await result.Key;
  res.status(200).send({ success: `${songkey}` });
});

app.listen(port, () => {
  console.log(`running on ${port}`);
});
