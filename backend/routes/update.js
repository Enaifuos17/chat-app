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

router.put("/update", async (req, res) => {
  const user = users.find((u) => u.email === req.body.email);
  if (user) {
    // * test

    //
    // hash the new password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    user.password = hashedPassword;
    // update the json file
    fs.writeFile(
      usersDataJson,
      JSON.stringify(users, null, 2),
      "utf8",
      (err) => {
        if (err) {
          console.error(err.message);
          res.status(500).json({ error: "Failed to update user" });
        } else {
          console.log("User updated successfully");
          res.status(200).json({ message: "Password updated successfully" });
        }
      }
    );
  } else {
    res.status(404).json({ message: "Your old password is incorrect!" });
    console.log("KAKAKAKAKA");
  }
});

// - - - - - - - - - - -

router.get("/api", (req, res) => {
  res.status(200).json(users);
});

// - - - - - - - - - - -
module.exports = router;
