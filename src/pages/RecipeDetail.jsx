import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from '../components/Header.jsx';
import RecipeCard from '../components/RecipeCard.jsx'; // optionally reuse

export default function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`http://localhost:5000/recipes/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Recipe not found');
        return res.json();
      })
      .then(data => setRecipe(data))
      .catch(err => setError(err.message));
  }, [id]);

  if (error) {
    return (
      <>
        <Header />
        <p className="text-center text-red-500 py-8">{error}</p>
      </>
    );
  }
  if (!recipe) {
    return (
      <>
        <Header />
        <p className="text-center py-8">Loading recipe…</p>
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto px-6 py-10">
        <h2 className="text-3xl font-bold mb-4">{recipe.title}</h2>
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-64 object-cover rounded-lg mb-6"
        />
        <p className="text-gray-700 mb-4">{recipe.description}</p>
        <p className="font-medium">Meal Type: {recipe.mealType}</p>
        <p className="font-medium">Popularity: {recipe.popularity}</p>
      </main>
    </>
  );
}
