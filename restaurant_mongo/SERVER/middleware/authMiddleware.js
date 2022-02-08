const jwt = require("jsonwebtoken");

const SECRET = "AUTHKEY";

module.exports.requireAuth = (req, res, next) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, SECRET, (err, decodedToken) => {
      if (err) {
        res.status(200).json({ action: "NOT_VERIFIED" });
      } else {
        res.locals.role = decodedToken.role;
        res.locals._id = decodedToken.id;
        next();
      }
    });
  } else {
    res.status(200).json({ action: "NO_TOKEN" });
  }
};
