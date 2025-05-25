import { useState, useEffect } from 'react';
import Header     from '../components/Header.jsx';
import RecipeCard from '../components/RecipeCard.jsx';

export default function Search() {
  const [recipes, setRecipes] = useState(null);
  const [query, setQuery]     = useState('');
  const [error, setError]     = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/recipes')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch recipes');
        return res.json();
      })
      .then(data => setRecipes(data))
      .catch(err => setError(err.message));
  }, []);

  // only filter by title text now
  const filtered = (recipes || []).filter(r =>
    r.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      <Header />

      <main className="py-8">
        <div className="max-w-4xl mx-auto px-6">
          {error && (
            <p className="text-red-500 text-center mb-4">{error}</p>
          )}

          {!recipes ? (
            <p className="text-center py-8">Loading recipes…</p>
          ) : (
            <>
              {/* 🔎 Search Bar Only */}
              <div className="mb-6">
                <input
                  type="text"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Search recipes by title..."
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 
                             focus:ring-2 focus:ring-olive-light focus:border-olive"
                />
              </div>

              {/* Results Grid */}
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
