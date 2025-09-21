const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Import all the route handlers
const authRoutes = require('./routes/auth');
const wishlistRoutes = require('./routes/wishlist');
const tripPlanRoutes = require('./routes/tripPlan');

const app = express();
const PORT = process.env.PORT || 5000;

// Request Logger Middleware (with fix for OPTIONS requests)
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] Received ${req.method} request for ${req.url}`);
  
  // Check if req.body exists before trying to access its keys
  if (req.body && Object.keys(req.body).length > 0) {
    console.log('Request Body:', req.body);
  }
  next();
});

// Standard Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected successfully.'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// API Routes - Tell the server which router to use for which URL path
app.use('/api/auth', authRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/tripplans', tripPlanRoutes);

// Test route to confirm the server is running
app.get('/', (req, res) => {
  res.send('Incredible India API is running!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});

