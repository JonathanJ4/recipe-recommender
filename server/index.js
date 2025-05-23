import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Recipe from './models/Recipe.js';

// Load any environment variables from server/.env
dotenv.config();



mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected (Atlas)'))
  .catch(err => console.error('❌ MongoDB connection error:', err));


const app = express();

// Allow our frontend (served on a different port) to hit this API
app.use(cors());

// Enable JSON parsing for POST/PUT
app.use(express.json());

// Simple health-check / hello endpoint
app.get('/', (req, res) => {
  res.send('🍽️ Recipe Hub API is running');
});

app.get('/recipes', async (req, res) => {
  try {
    const filter = {};
    if (req.query.mealType) {
      filter.mealType = req.query.mealType;
    }
    const list = await Recipe.find(filter);
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET trending recipes (top 6 by popularity)
app.get('/recipes/trending', async (req, res) => {
  try {
    const top = await Recipe.find()
      .sort({ popularity: -1 })
      .limit(6);
    res.json(top);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST a new recipe
app.post('/recipes', async (req, res) => {
  try {
    const created = await Recipe.create(req.body);
    res.status(201).json(created);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


// Placeholder for later routes (e.g. /recipes)
// app.use('/recipes', require('./routes/recipes'));





const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
});

