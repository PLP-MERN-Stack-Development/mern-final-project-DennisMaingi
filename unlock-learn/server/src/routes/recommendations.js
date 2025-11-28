import express from 'express';
import Recommendation from '../models/Recommendation.js';

const router = express.Router();

// Get recommendations for a user
router.get('/', async (req, res) => {
  const { userId } = req.query;
  try {
    const filter = userId ? { userId } : {};
    const recommendations = await Recommendation.find(filter).sort({ createdAt: -1 });
    res.json(recommendations);
  } catch (err) {
    console.error('Error fetching recommendations:', err);
    res.status(500).json({ error: err.message });
  }
});

// Create a recommendation
router.post('/', async (req, res) => {
  try {
    const recommendation = await Recommendation.create(req.body);
    res.status(201).json(recommendation);
  } catch (err) {
    console.error('Error creating recommendation:', err);
    res.status(400).json({ error: err.message });
  }
});

export default router;  // ✅ important for ES module import
