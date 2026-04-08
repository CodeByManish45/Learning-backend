const jwt = require("jsonwebtoken");

async function authenticateToken(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized access" });
  }

  let decoded = null;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return res.status(404).json({ message: "User not found" });
  }
  req.user = decoded; // Attach the decoded user information to the request object
  next(); // Proceed to the next middleware or route handler
}

module.exports = {
  authenticateToken,
};
