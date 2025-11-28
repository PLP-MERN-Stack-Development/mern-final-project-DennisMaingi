// src/routes/payments.js
import express from 'express';
import Stripe from 'stripe';
import Enrollment from '../models/Enrollment.js';
import Payment from '../models/Payment.js';

const router = express.Router();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

// Webhook endpoint requires raw body
router.post(
  '/',
  express.raw({ type: 'application/json' }),
  async (req, res) => {
    const signature = req.headers['stripe-signature'];
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!signature || !webhookSecret) {
      return res.status(400).send('Missing signature or webhook secret');
    }

    try {
      const event = stripe.webhooks.constructEvent(req.body, signature, webhookSecret);
      console.log('Stripe webhook event:', event.type);

      switch (event.type) {
        case 'checkout.session.completed': {
          const session = event.data.object;
          const metadata = session.metadata || {};
          const courseId = metadata.courseId;
          const userId = metadata.userId;

          if (!courseId || !userId) {
            console.error('Missing metadata in session');
            break;
          }

          // Check if enrollment already exists
          const existingEnrollment = await Enrollment.findOne({
            user_id: userId,
            course_id: courseId,
          });

          if (!existingEnrollment) {
            // Create payment record
            const payment = await Payment.create({
              user_id: userId,
              course_id: courseId,
              amount: (session.amount_total || 0) / 100, // convert cents to units
              payment_method: 'stripe',
              status: 'completed',
              stripe_session_id: session.id,
              transaction_id: session.payment_intent,
            });

            // Create enrollment
            await Enrollment.create({
              user_id: userId,
              course_id: courseId,
              enrolled_at: new Date(),
              payment_id: payment._id,
            });

            // Emit real-time enrollment event via Socket.IO
            const io = req.app.get('io');
            if (io) {
              io.to(`user_${userId}`).emit('enrollment_created', {
                courseId,
                userId,
                paymentId: payment._id,
              });
            }

            console.log('Enrollment created for user:', userId, 'course:', courseId);
          } else {
            console.log('Enrollment already exists for user:', userId, 'course:', courseId);
          }
          break;
        }

        case 'payment_intent.payment_failed': {
          const paymentIntent = event.data.object;
          console.error('Payment failed:', paymentIntent.id);

          // Update payment status to failed
          await Payment.findOneAndUpdate(
            { stripe_payment_intent: paymentIntent.id },
            { status: 'failed' }
          );
          break;
        }

        default:
          console.log('Unhandled event type:', event.type);
      }

      res.json({ received: true });
    } catch (error) {
      console.error('Webhook error:', error);
      res.status(400).json({
        error: error.message || 'Webhook processing error',
      });
    }
  }
);

export default router;
