const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

function createToken(user) {
  const payload = { id: user._id, username: user.username, email: user.email };
  const options = { expiresIn: "2d" };

  return new Promise((resolve, reject) => {
    jwt.sign(payload, process.env.SECRET, options, (err, decodedToken) => {
      if (err) {
        return reject(err);
      }

      resolve(decodedToken);
    });
  });
}

router.post("/api/register", async (req, res) => {
  const { password, ...userData } = req.body;

  const userExists = await User.findOne({ email: userData.email });

  if (userExists) return res.status(403).send({ message: "User exists" });

  bcrypt.hash(password, 10, async function (err, hashedPassword) {
    try {
      const user = await User.create({
        password: hashedPassword,
        createdDate: new Date().getTime(),
        ...userData,
      });

      const token = await createToken(user);

      return res.status(201).send({
        jwt: token,
        user: {
          username: user.username,
          email: user.email,
          createDate: user.createdDate,
          id: user._id,
        },
      });
    } catch (err) {
      return res
        .status(406)
        .send({ message: "Error while creating user", error: err });
    }
  });
});

router.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user)
    return res.status(403).send({ message: "Incorrect email or password" });

  bcrypt.compare(password, user.password, async function (err, result) {
    if (result) {
      const token = await createToken(user);

      return res.status(200).send({
        jwt: token,
        user: {
          username: user.username,
          email: user.email,
          createDate: user.createdDate,
          id: user._id,
        },
      });
    } else {
      return res.status(401).send({ message: "Incorrect email or password" });
    }
  });
});

module.exports = router;
