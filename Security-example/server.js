const fs = require("fs");
const https = require("https");
const path = require("path");
const express = require("express");
const helmet = require("helmet");
const passport = require("passport");
const { Strategy } = require("passport-google-oauth20");

require("dotenv").config();

const PORT = 3000;

const config = {
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET,
};
const AUTH_OPTIONS = {
  clientID: config.CLIENT_ID,
  clientSecret: config.CLIENT_SECRET,
  callbackURL: "/auth/google/callback",
};

function verifyCallBack(accessToken, refreshToken, profile, done) {
  console.log("Google Profile", profile);
  done(null, profile);
}
passport.use(new Strategy(AUTH_OPTIONS, verifyCallBack));
const app = express();
app.use(helmet());
app.use(passport.initialize());

function checkLoggedIn(req, res, next) {
  const isLoggedIn = true;
  if (!isLoggedIn) {
    return res.status(401).send("You are not logged in!");
  }
  next();
}

app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
  })
);
app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/",
    failureRedirect: "/failure",
    session: false,
  })
),
  (req, res) => {
    console.log("Call us back!");
  };
app.get("/auth/logout", (req, res) => {});
app.get("/secret", checkLoggedIn, (req, res) => {
  return res.send("Your personal secret value is 42!");
});
app.get("/failure", (req, res) => {
  return res.status(401).send("Failed to login!");
});
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

https
  .createServer(
    {
      key: fs.readFileSync("key.pem"),
      cert: fs.readFileSync("cert.pem"),
    },
    app
  )
  .listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
  });
