// src/components/RecipeCard.jsx
import { Link } from 'react-router-dom';

export default function RecipeCard({ recipe }) {
  return (
    <Link to={`/recipe/${recipe._id}`} className="block">
      <div className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden">
        <img
          className="w-full h-40 object-cover"
          src={recipe.image}
          alt={recipe.title}
        />
        <div className="p-4">
          <h4 className="font-semibold text-lg mb-1">{recipe.title}</h4>
          <p className="text-gray-600 text-sm">{recipe.description}</p>
        </div>
      </div>
    </Link>
  );
}
