const express = require("express");
const cors = require("cors");
const path = require("path");
const places = require(path.join(__dirname, "../public/data/places.json"));

const app = express();
const port = 5000;

app.use(cors());

app.get("/api/places", (req, res) => {
  res.json({ places });
});

app.use(express.static(path.join(__dirname, "public")));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
