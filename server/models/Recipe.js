// server/models/Recipe.js
import mongoose from 'mongoose';
import { defaultAllowedOrigins } from 'vite';

const recipeSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  description: { type: String, required: true},
  image:       { type: String, default: '' },
  mealType:    { type: String, default:''},
  popularity:  { type: Number, default: 0 },
  ingredients: {
    type: [String],
    default: []
  }
});

export default mongoose.model('Recipe', recipeSchema);


