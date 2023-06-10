const jwt = require("jsonwebtoken");
const { config } = require("../config");

const Auth = (req, res, next) => {
  const token = req.headers.token;

  jwt.verify(token, config.secret, (err, decoded) => {
    if (decoded) next();
    else res.status(400).send({ err: err });
  });
};

module.exports = { Auth };
