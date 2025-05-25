import { Link } from 'react-router-dom';

export default function RecipeCard({ recipe }) {
  // show up to 3 ingredients, then an ellipsis
  const preview = (recipe.ingredients || []).slice(0, 3);

  return (
    <Link
      to={`/recipe/${recipe._id}`}
      className="block bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
    >
      {recipe.image && (
        <img
          className="w-full h-40 object-cover"
          src={recipe.image}
          alt={recipe.title}
        />
      )}

      <div className="p-4">
        <h4 className="font-semibold text-lg mb-1">{recipe.title}</h4>
        <p className="text-gray-600 text-sm mb-2">
          {recipe.description}
        </p>
        {preview.length > 0 && (
          <p className="text-gray-500 text-xs italic">
            {preview.join(', ')}
            {recipe.ingredients.length > 3 ? '…' : ''}
          </p>
        )}
      </div>
    </Link>
  );
}
