// src/routes/users.js
import express from "express";
import User from "../models/User.js";
import { protect } from "../middleware/protect.js";

const router = express.Router();

// -----------------------
// REGISTER USER (Public)
// -----------------------
router.post("/", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const newUser = await User.create({ name, email, password });

    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
    });
  } catch (error) {
    console.error("Create user error:", error);
    res.status(500).json({ error: error.message || "Server error" });
  }
});

// -----------------------
// GET PROFILE (Protected)
// -----------------------
router.get("/profile", protect, async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ error: "User not found" });
    res.json(req.user);
  } catch (error) {
    console.error("Get profile error:", error);
    res.status(500).json({ error: error.message || "Server error" });
  }
});

// -----------------------
// UPDATE PROFILE (Protected)
// -----------------------
router.put("/profile", protect, async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ error: "User not found" });

    const { name, email } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { name, email },
      { new: true, runValidators: true }
    ).select("-password");

    res.json(updatedUser);
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({ error: error.message || "Server error" });
  }
});

// -----------------------
// GET ALL USERS (Admin)
// -----------------------
router.get("/", protect, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    console.error("Get all users error:", error);
    res.status(500).json({ error: error.message || "Server error" });
  }
});

// -----------------------
// GET USER BY ID (Admin)
// -----------------------
router.get("/:id", protect, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (error) {
    console.error("Get user error:", error);
    res.status(500).json({ error: error.message || "Server error" });
  }
});

// -----------------------
// UPDATE USER BY ID (Admin)
// -----------------------
router.put("/:id", protect, async (req, res) => {
  try {
    const { name, email } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { name, email },
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) return res.status(404).json({ error: "User not found" });
    res.json(updatedUser);
  } catch (error) {
    console.error("Update user error:", error);
    res.status(500).json({ error: error.message || "Server error" });
  }
});

// -----------------------
// DELETE USER BY ID (Admin)
// -----------------------
router.delete("/:id", protect, async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ error: "User not found" });
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Delete user error:", error);
    res.status(500).json({ error: error.message || "Server error" });
  }
});

export default router;
