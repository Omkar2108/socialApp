const express = require("express");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const argon2 = require("argon2");
const cors = require("cors");
const bodyparser = require("body-parser");
const compression = require("compression");

const db = require("./db");
const { User } = require("./model");

db.once("open", async () => {
  console.log("database connected");
});

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(compression());

function parseJwt(token) {
  return JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
}

// Middleware to verify jwt
const verifyJwt = async (req, res, next) => {
  const auth = req.header("auth");
  const username = req.header("username");
  await jwt.verify(auth, "JWTSECRET", (err, result) => {
    if (err) {
      return res.status(406).send({ msg: "Session Expired, please login" });
    }
    if (result) return next();
  });
};

// User Auth
app.post("/register", async (req, res) => {
  const { username, password, email } = req.body;
  const hashedPassword = await argon2.hash(password);

  const newUser = new User({
    username,
    password: hashedPassword,
    email,
  });

  await newUser
    .save()
    .then(async() => {
      const auth = await jwt.sign({ username }, "JWTSECRET", {
        expiresIn: 900,
      });
      res.status(200).send({username, auth, msg: "User Registered Successfully.!" });
    })
    .catch((err) => {
      if (err && err.code === 11000) {
        return res.status(200).send({ msg: "Username/User already exits.!" });
      }
      res.status(500).send({ msg: "Internal Server Error.!" });
    });
});

app.post("/", async (req, res) => {
  const { username, password } = req.body;
  await User.findOne({ username })
    .then(async (user) => {
      await argon2
        .verify(user.password, password)
        .then(async (result) => {
          if (result) {
            const auth = await jwt.sign({ username }, "JWTSECRET", {
              expiresIn: 900,
            });
            const refresh = await jwt.sign({ username }, "JWTSECRET", {
              expiresIn: 7200,
            });
            await User.updateOne(
              { username },
              { $set: { lastLogin: new Date() } }
            );
            res.cookie("refresh", refresh, {
              httpOnly: true,
              sameSite: "none",
              secure: true,
              maxAge: 7200 * 1000,
            });
            return res.status(200).send({username, msg: "Login Success", auth });
          }
          res.status(200).send({ msg: "Invalid credentials!" });
        })
    })
    .catch((err) => {
      res.status(500).send({ msg: "Internal Server Error" });
    });
});

app.get("/refresh", (req, res) => {
  console.log(req.cookies);
  if (req.cookies?.refresh) {
    const refreshToken = req.cookies.refresh;

    jwt.verify(refreshToken, "JWTSECRET", (err, result) => {
      if (err) return res.status(406).send({ msg: "Invalid Credentials" });
      const data = parseJwt(refreshToken);
      console.log(data);
      //   const auth = jwt.sign();
    });
  }
  res.send("done");
});

app.get("/check", verifyJwt, (req, res) => {
  res.status(200).send({ msg: "valid credentials" });
});

app.listen(process.env.PORT, () => {
  console.log("Server is up and runnning");
});
