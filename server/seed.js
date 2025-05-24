// server/seed.js
import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import csvParser from 'csv-parser';
import Recipe from './models/Recipe.js';

dotenv.config();

async function seed() {
  try {
    // 1) Connect to Atlas
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // 2) Clear existing recipes
    await Recipe.deleteMany({});
    console.log('🗑️  Cleared recipes collection');

    // 3) Read & parse the CSV
    const recipes = [];
    const csvFile = path.resolve('../data/kaggle/recipes.csv'); 
    console.log(`📥 Streaming CSV from ${csvFile}`);

    await new Promise((resolve, reject) => {
      fs.createReadStream(csvFile)
        .pipe(csvParser())
        .on('data', row => {
          // row.Title, row.Instructions, row.Image_Name, row.Cleaned_Ingredients
          // Cleaned_Ingredients might be like "['salt','pepper',...]"
          let ingredientsList = [];
          try {
            // normalize quotes then JSON.parse
            ingredientsList = JSON.parse(
              row.Cleaned_Ingredients.replace(/'/g, '"')
            );
          } catch(_) {/* ignore parse errors */}

          recipes.push({
            title:       row.Title,
            description: row.Instructions.slice(0, 300), 
            image:       row.Image_Name
                          ? `http://localhost:5000/images/${row.Image_Name}`
                          : '',
            // you can later derive this from tags or ingredients
            mealType:    '',
            // use count of cleaned ingredients as a proxy for popularity
            popularity:  ingredientsList.length
          });
        })
        .on('end', () => {
          console.log(`   • Parsed ${recipes.length} recipes from CSV`);
          resolve();
        })
        .on('error', err => reject(err));
    });

    // 4) Bulk‐insert in batches of 1000
    const batchSize = 1000;
    for (let i = 0; i < recipes.length; i += batchSize) {
      const chunk = recipes.slice(i, i + batchSize);
      await Recipe.insertMany(chunk);
      console.log(`   ✓ Inserted ${Math.min(i + batchSize, recipes.length)}/${recipes.length}`);
    }

    console.log('🎉 Seeding complete!');
  } catch (err) {
    console.error('❌ Seeding error:', err);
  } finally {
    await mongoose.disconnect();
    process.exit();
  }
}

seed();
