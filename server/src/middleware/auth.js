const jwt = require("jsonwebtoken");

function getSecret() {
  return process.env.JWT_SECRET || "dev-secret-change-me";
}

// Accepts `Authorization: Bearer <token>` or legacy `x-access-token` header.
function verifyJWT(req, res, next) {
  const raw = req.headers.authorization || req.headers["x-access-token"] || "";
  const token = raw.startsWith("Bearer ") ? raw.slice(7) : raw;
  if (!token) return res.status(401).json({ isLoggedIn: false, message: "No token provided" });
  jwt.verify(token, getSecret(), (err, decoded) => {
    if (err) return res.status(401).json({ isLoggedIn: false, message: "Failed to authenticate" });
    req.user = { id: decoded.id, email: decoded.email, first_name: decoded.first_name, last_name: decoded.last_name };
    next();
  });
}

module.exports = { verifyJWT, getSecret };
