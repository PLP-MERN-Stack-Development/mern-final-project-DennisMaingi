// src/routes/ticketMessages.js
import express from 'express';
import TicketMessage from '../models/TicketMessage.js';

const router = express.Router();

// Get messages by ticketId
router.get('/', async (req, res) => {
  const { ticketId } = req.query;
  try {
    const filter = ticketId ? { ticketId } : {};
    const messages = await TicketMessage.find(filter).sort({ createdAt: 1 });
    res.json(messages);
  } catch (err) {
    console.error('Error fetching ticket messages:', err);
    res.status(500).json({ error: err.message });
  }
});

// Create a message
router.post('/', async (req, res) => {
  try {
    const message = await TicketMessage.create(req.body);
    res.status(201).json(message);
  } catch (err) {
    console.error('Error creating ticket message:', err);
    res.status(400).json({ error: err.message });
  }
});

export default router;
