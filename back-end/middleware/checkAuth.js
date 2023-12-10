const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const decodedToken = jwt.verify(req.headers.jwt, process.env.SECRET);

    req.userInSession = decodedToken;

    next();
  } catch (err) {
    return res.status(401).send({ message: "Not Authorized" });
  }
};
