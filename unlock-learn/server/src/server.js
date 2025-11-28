// src/server.js
import express from 'express';
import http from 'http';
import { Server as SocketIO } from 'socket.io';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

dotenv.config();

// Route imports MUST include .js extensions for ESM
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import contentRoutes from './routes/content.js';
import aiRoutes from './routes/ai.js';
import recommendationsRoutes from './routes/recommendations.js';
import mpesaPaymentRoutes from './routes/mpesa-payment.js';
import stripeCheckoutRoutes from './routes/stripe-checkout.js';
import stripeWebhookRoutes from './routes/stripe-webhook.js';
import coursesRoutes from './routes/courses.js';
import courseContentRoutes from './routes/course-content.js';
import certificateRoutes from './routes/certificate.js';
import profileRoutes from './routes/profile.js';
import newsletterRoutes from './routes/newsletter.js';

const app = express();
const server = http.createServer(app);

// SOCKET.IO
const io = new SocketIO(server, {
  cors: {
    origin: [process.env.CLIENT_URL || 'http://localhost:8080', 'http://localhost:8081'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  },
});

// MIDDLEWARE
app.use(
  cors({
    origin: [process.env.CLIENT_URL || 'http://localhost:8080', 'http://localhost:8081'],
    credentials: true,
  })
);
app.use(helmet());
app.use(morgan('dev'));

// Stripe webhook needs raw body
app.use('/api/stripe-webhook', bodyParser.raw({ type: 'application/json' }));

// JSON for all other routes
app.use(express.json({ limit: '10mb' }));

// DATABASE SETUP
const MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://localhost:27017/unlock-learn';

mongoose
  .connect(MONGODB_URI)
  .then(() =>
    console.log('✅ Connected to MongoDB:', mongoose.connection.name)
  )
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

// SOCKET.IO EVENTS
io.on('connection', (socket) => {
  console.log('🔌 User connected:', socket.id);

  socket.on('join_user', (userId) => {
    socket.join(`user_${userId}`);
  });

  socket.on('join_content', (contentId) => {
    socket.join(`content_${contentId}`);
  });

  socket.on('join_course', (courseId) => {
    socket.join(`course_${courseId}`);
  });

  socket.on('disconnect', () => {
    console.log('❌ User disconnected:', socket.id);
  });
});

// Make io available inside routes
app.set('io', io);

// ROUTES
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/recommendations', recommendationsRoutes);
app.use('/api/mpesa-payment', mpesaPaymentRoutes);
app.use('/api/stripe-checkout', stripeCheckoutRoutes);
app.use('/api/stripe-webhook', stripeWebhookRoutes);
app.use('/api/courses', coursesRoutes);
app.use('/api/courses', courseContentRoutes);
app.use('/api/courses', certificateRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/newsletter', newsletterRoutes);

// HEALTH CHECK
app.get('/api/health', (req, res) => {
  res.json({
    status: 'Server is running ✅',
    timestamp: new Date(),
    database:
      mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
    databaseName: mongoose.connection.name || 'Not connected',
  });
});

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend server is working perfectly!' });
});

// 404 Handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('🚨 Server Error:', err);
  res.status(500).json({
    message: 'Something went wrong!',
    error:
      process.env.NODE_ENV === 'development'
        ? err.message
        : 'Internal server error',
  });
});

// START SERVER
const PORT = process.env.PORT || 5000;
server.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);

export { app, io };
