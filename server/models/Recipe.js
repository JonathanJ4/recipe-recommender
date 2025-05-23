// server/models/Recipe.js
import mongoose from 'mongoose';

const recipeSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  description: { type: String, required: true },
  image:       { type: String, required: true },
  mealType:    { type: String, enum: ['breakfast','lunch','dinner'], required: true },
  popularity:  { type: Number, default: 0 }
});

export default mongoose.model('Recipe', recipeSchema);


