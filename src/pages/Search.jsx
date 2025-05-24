import { useState, useEffect } from 'react';
import Header        from '../components/Header.jsx';
import SearchFilters from '../components/SearchFilters.jsx';
import RecipeCard    from '../components/RecipeCard.jsx';

export default function Search() {
  const [allRecipes, setAllRecipes] = useState(null);
  const [query, setQuery]           = useState('');
  const [mealType, setMealType]     = useState('');
  const [error, setError]           = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/recipes')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch recipes');
        return res.json();
      })
      .then(data => setAllRecipes(data))
      .catch(err => setError(err.message));
  }, []);

  const filtered = (allRecipes || []).filter(r => {
    return (
      r.title.toLowerCase().includes(query.toLowerCase()) &&
      (mealType === '' || r.mealType === mealType)
    );
  });

  return (
    <>
      <Header />

      <main className="py-8">
        <div className="max-w-4xl mx-auto px-6">
          {error && (
            <p className="text-red-500 text-center mb-4">{error}</p>
          )}

          {!allRecipes ? (
            <p className="text-center py-8">Loading recipes…</p>
          ) : (
            <>
              <SearchFilters
                query={query}
                setQuery={setQuery}
                mealType={mealType}
                setMealType={setMealType}
              />

              {filtered.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {filtered.map(r => (
                    <RecipeCard key={r._id} recipe={r} />
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-500 mt-6 italic">
                  No recipes found.
                </p>
              )}
            </>
          )}
        </div>
      </main>
    </>
  );
}
