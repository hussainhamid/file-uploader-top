const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());

app.get("/", (req, res) => {
  res.json({ fruits: ["apple", "banana", "mango", "watermelon"] });
});

app.listen(3000, () => {
  console.log("app running on 3000");
});
