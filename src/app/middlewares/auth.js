const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ message: "Invalid authorization" });
    }

    const [prefix, token] = authorization.split(" ");

    if (!prefix || !token) {
      return res.status(401).json({ message: "Invalid authorization" });
    }

    const allowedPrefixes = ["bearer", "Bearer"];
    if (!allowedPrefixes.includes(prefix)) {
      return res.status(401).json({ message: "Invalid authorization" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    return next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid authorization" });
    }

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    }

    return res.status(500).json({ message: "Internal Server Error" });
  }
}

module.expires = {
  auth,
};
