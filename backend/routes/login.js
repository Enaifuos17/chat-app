const express = require("express");
const router = express.Router();
const fs = require("node:fs");
const bcrypt = require("bcrypt");

const usersDataJson =
  "C:/E/ARK-X/BootCamp/2_Feb/co-sms/backend/users_data.json";

// stock our JSON data into users []
let users = [];
fs.readFile(usersDataJson, "utf8", (err, data) => {
  if (err) throw err;
  users = JSON.parse(data);
});

// - - - - - - - - - - -

// login
router.post("/login", async (req, res) => {
  const user = users.find(
    (u) => u.username === req.body.username.toLowerCase()
  );
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      res.status(200).json({ message: "user found" });
    } else {
      res.status(404).json({ message: "something wrong!" });
    }
  } else {
    res.status(404).json({ message: "user not found" });
  }
});

// - - - - - - - - - - -
module.exports = router;
