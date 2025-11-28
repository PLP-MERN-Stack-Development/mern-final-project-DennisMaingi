// src/routes/mpesa-payment.js
import express from 'express';
import MpesaPayment from '../models/MpesaPayment.js';

const router = express.Router();

import { protect } from '../middleware/auth.js';

// Create a payment
router.post('/', protect, async (req, res) => {
  try {
    const { courseId, phoneNumber, amount } = req.body;
    
    const payment = await MpesaPayment.create({
      userId: req.user._id,
      amount,
      status: 'pending',
      transactionId: `MPESA-${Date.now()}`
    });
    
    res.status(201).json({ 
      message: 'Payment initiated successfully',
      payment 
    });
  } catch (err) {
    console.error('Error creating Mpesa payment:', err);
    res.status(400).json({ message: err.message });
  }
});

// Get payments by user
router.get('/', async (req, res) => {
  const { userId } = req.query;
  try {
    const filter = userId ? { userId } : {};
    const payments = await MpesaPayment.find(filter).sort({ createdAt: -1 });
    res.json(payments);
  } catch (err) {
    console.error('Error fetching Mpesa payments:', err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
