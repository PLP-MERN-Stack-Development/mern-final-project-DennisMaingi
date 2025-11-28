// src/routes/interactions.js
import express from "express";
import UserInteraction from "../models/UserInteraction.js";

const router = express.Router();

// -------------------------------------------
// GET interactions for a user
// -------------------------------------------
router.get("/", async (req, res) => {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ error: "userId query parameter is required" });
  }

  try {
    const interactions = await UserInteraction.find({ user_id: userId }).sort({ createdAt: -1 });
    res.json(interactions);
  } catch (err) {
    console.error("Error fetching interactions:", err);
    res.status(500).json({ error: err.message || "Server error" });
  }
});

// -------------------------------------------
// CREATE a new interaction
// -------------------------------------------
router.post("/", async (req, res) => {
  const { user_id, course_id, interaction_type, metadata } = req.body;

  if (!user_id || !course_id || !interaction_type) {
    return res.status(400).json({
      error: "user_id, course_id, and interaction_type are required",
    });
  }

  try {
    const interaction = await UserInteraction.create({
      user_id,
      course_id,
      interaction_type,
      metadata,
    });

    res.status(201).json(interaction);
  } catch (err) {
    console.error("Error creating interaction:", err);
    res.status(400).json({ error: err.message || "Failed to create interaction" });
  }
});

export default router;
