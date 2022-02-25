const config = require("config");
const jsonwebtoken = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.header("auth-devConnector-token");
    if (!token) {
      return res.status(401).json({ msg: "no token, authorization denied." });
    }
    req.userId = jsonwebtoken.verify(token, config.get("jwtSecret")).user.id;
    next();
  } catch (err) {
    return res.status(401).json({ msg: "Token is not valid" });
  }
};
