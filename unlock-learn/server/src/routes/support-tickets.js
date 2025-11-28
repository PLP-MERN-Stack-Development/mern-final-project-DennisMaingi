// src/routes/supportTickets.js
import express from 'express';
import SupportTicket from '../models/SupportTicket.js';

const router = express.Router();

// Get tickets (optionally by user)
router.get('/', async (req, res) => {
  const { userId } = req.query;
  try {
    const filter = userId ? { userId } : {};
    const tickets = await SupportTicket.find(filter).sort({ createdAt: -1 });
    res.json(tickets);
  } catch (err) {
    console.error('Error fetching tickets:', err);
    res.status(500).json({ error: err.message });
  }
});

// Create a ticket
router.post('/', async (req, res) => {
  try {
    const ticket = await SupportTicket.create(req.body);
    res.status(201).json(ticket);
  } catch (err) {
    console.error('Error creating ticket:', err);
    res.status(400).json({ error: err.message });
  }
});

// Update ticket
router.put('/:id', async (req, res) => {
  try {
    const ticket = await SupportTicket.findById(req.params.id);
    if (!ticket) return res.status(404).json({ error: 'Ticket not found' });

    Object.assign(ticket, req.body);
    await ticket.save();
    res.json(ticket);
  } catch (err) {
    console.error('Error updating ticket:', err);
    res.status(400).json({ error: err.message });
  }
});

export default router;
