// src/routes/stripeCheckout.js
import express from 'express';
import Stripe from 'stripe';
import { protect } from '../middleware/auth.js';
import dotenv from 'dotenv';

dotenv.config(); // <-- load .env variables

const router = express.Router();

// Ensure the secret key exists
if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not set in .env');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

// Helper to determine client URL
function getClientUrl(req) {
  const forwardedHost = req.headers['x-forwarded-host'];
  const protocol = req.headers['x-forwarded-proto'] || 'http';
  if (forwardedHost && forwardedHost.includes('ngrok')) {
    return `${protocol}://${forwardedHost}`;
  }
  return process.env.CLIENT_URL || 'http://localhost:8080';
}

// CORS middleware
router.use((req, res, next) => {
  const origin = getClientUrl(req);
  res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Authorization, X-Client-Info, ApiKey, Content-Type'
  );
  next();
});

// Create Stripe checkout session
router.post('/', protect, async (req, res) => {
  if (req.method === 'OPTIONS') return res.status(200).send('CORS OK');

  try {
    const { courseId, price, currency, courseName } = req.body;
    const userId = req.user && req.user._id;

    if (!courseId || !price || !userId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const clientUrl = getClientUrl(req);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: currency || 'usd',
            product_data: {
              name: courseName || 'Course Purchase',
              description: `InclusiveLearn Course: ${courseName || 'N/A'}`,
            },
            unit_amount: Math.round(price * 100),
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${clientUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${clientUrl}/checkout/cancel`,
      metadata: {
        courseId,
        userId: userId.toString(),
      },
    });

    console.log('✅ Stripe checkout session created:', session.id);
    res.status(200).json({ url: session.url });
  } catch (error) {
    console.error('❌ Stripe checkout error:', error);
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
});

export default router;
