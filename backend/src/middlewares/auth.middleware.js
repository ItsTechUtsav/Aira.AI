const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {



    const authHeader = req.headers.authorization;


    console.log("AUTH HEADER:", authHeader);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.log("NO / INVALID AUTH HEADER");
      return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];

    console.log("EXTRACTED TOKEN:", token);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decoded.id;

    console.log("REQ USER ID:", req.userId);

    next();
  } catch (error) {
    console.log("AUTH ERROR:", error.message);
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;