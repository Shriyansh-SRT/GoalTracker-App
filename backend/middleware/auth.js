const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    // Get token from header (format: "Bearer <token>")
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user ID to the request
    req.user = { userId: decoded.userId };
    next();
  } catch (error) {
    res.status(401).json({ error: "Unauthorized. Please log in." });
  }
};
