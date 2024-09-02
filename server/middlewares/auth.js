const jwt = require("jsonwebtoken");
const { authCredentials } = require("../config/index");

module.exports = async (req, res, next) => {
  let token;
  if (req.headers && req.headers.authorization) {
    let parts = req.headers.authorization.split(" ");
    token = parts[1];
  } else if (req.param.token) {
    token = req.param.token;

    // We delete the token from query and body
    delete req.query.token;
    delete req.body.token;
  } else {
    return res.status(400).json({ error: { message: "No authorization header" } });
  }

  let verifyToken = jwt.verify(token, authCredentials.secretKey);
  if (verifyToken) {
    // console.log("Token is valid");
    return next();
  } else {
    return res.status(400).json({ error: { message: "Token is invalid or has expired" } });
  }
};
