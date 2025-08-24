const jwt = require("jsonwebtoken");

const isAuth = (req, res, next) => {
  try {
    let token;

    // 1. First check cookie
    if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }
    // 2. If no cookie, check Authorization header
    else if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ message: "No token, authorization denied" });
    }

    // 3. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // 4. Attach user info from token to request object
    req.user = decoded;

    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = isAuth;
