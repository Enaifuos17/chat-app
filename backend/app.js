const express = require("express");
const fs = require("node:fs");
const signUpPath = require("./routes/signup");
const loginPath = require("./routes/login");
const updatePath = require("./routes/update");

const app = express();
const PORT = 3000;

// to deal with the json type
app.use(express.json());
// enocode data
app.use(express.urlencoded({ extended: true }));

// CORS middleware
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5500"); // Update this to your frontend URL
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// routes
app.use(signUpPath);
app.use(loginPath);
app.use(updatePath);

// run the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
