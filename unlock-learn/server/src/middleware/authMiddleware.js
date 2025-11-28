// middleware/authMiddleware.js
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// -------------------------------------------------------
// Protect Middleware (JWT Authentication)
// -------------------------------------------------------
export const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    const token = authHeader.split(" ")[1];

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is missing in environment variables");
    }

    // Decode token → expects { id: string }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user in MongoDB (exclude password)
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user; // Attach user to request
    next();
  } catch (error) {
    console.error("❌ Auth error:", error);
    res.status(401).json({ message: "Token invalid or expired" });
  }
};

// -------------------------------------------------------
// Admin Middleware
// -------------------------------------------------------
export const admin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Not authorized as admin" });
  }
};
