const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const authToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.status(401).json({ message: "Auth token required" });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res
        .status(403)
        .json({ message: "Token expired. Please LogIn again" });
    }
    req.user = user;
    next();
  });
};

module.exports = { authToken };
