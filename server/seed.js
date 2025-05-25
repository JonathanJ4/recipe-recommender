// server/seed.js
import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import csvParser from 'csv-parser';
import Recipe from './models/Recipe.js';

dotenv.config();

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('✅ Connected to MongoDB');

  await Recipe.deleteMany({});
  console.log('🗑️  Cleared recipes collection');

  const recipes = [];
  const csvFile = path.resolve('../data/kaggle/recipes.csv');

  await new Promise((resolve, reject) => {
    fs.createReadStream(csvFile)
      .pipe(csvParser())
      .on('data', row => {
        if (!row.Title || !row.Instructions) return;

        // Parse the Cleaned_Ingredients string into an array
        let ingList = [];
        if (row.Cleaned_Ingredients) {
          try {
            ingList = JSON.parse(
              row.Cleaned_Ingredients.replace(/'/g, '"')
            );
          } catch (err) {
            // skip on parse error
          }
        }

        recipes.push({
          title:       row.Title.trim(),
          description: row.Instructions.trim().slice(0, 300),
          instructions: row.Instructions.trim(),
          image:       row.Image_Name
                        ? `http://localhost:5000/images/${row.Image_Name}.jpg`
                        : '',
          mealType:    '',                     // leave blank for now
          popularity:  ingList.length,
          ingredients: ingList
        });
      })
      .on('end', () => {
        console.log(`   • Parsed ${recipes.length} recipes`);
        resolve();
      })
      .on('error', err => reject(err));
  });

  // Insert in batches
  for (let i = 0; i < recipes.length; i += 1000) {
    await Recipe.insertMany(recipes.slice(i, i + 1000));
    console.log(`   ✓ Inserted up to ${i + 1000}/${recipes.length}`);
  }

  console.log('🎉 Seeding complete!');
  await mongoose.disconnect();
  process.exit();
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});
