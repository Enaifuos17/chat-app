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

// create new user - signUp
router.post("/signup", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(); // generate the salt
    const hashedPassword = await bcrypt.hash(req.body.password, salt); // hash the password
    console.log(salt);
    console.log(hashedPassword);
    //
    const newUser = {
      id: users.length + 1,
      username: req.body.username.toLowerCase(),
      email: req.body.email,
      password: hashedPassword,
    };
    users.push(newUser);
    fs.writeFile(
      usersDataJson,
      JSON.stringify(users, null, 2),
      "utf8",
      (err) => {
        if (err) {
          console.error(err.message);
          res.status(500).json({ error: "Failed to add user" });
        } else {
          console.log("User added successfully");
          res.status(201).json(newUser);
        }
      }
    );
  } catch (err) {
    res.status(500).json({ message: "something wrong!" });
  }
});

// - - - - - - - - - - -

router.get("/api", (req, res) => {
  res.status(200).json(users);
});

// - - - - - - - - - - -
module.exports = router;
