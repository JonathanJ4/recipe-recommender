import { useState, useEffect } from 'react';
import Header from '../components/Header.jsx';
import RecipeCard from '../components/RecipeCard.jsx';

export default function Search() {
  const [recipes, setRecipes] = useState(null);
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/recipes')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch recipes');
        return res.json();
      })
      .then(data => setRecipes(data))
      .catch(err => setError(err.message));
  }, []);

  // Filter and limit results
  const filtered = (recipes || []).filter(r =>
    r.title.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 20);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Search Section */}
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Search Recipes
            </h1>
            <p className="text-gray-600 mb-8">
              Find your perfect recipe from our collection
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Search by recipe title..."
                  className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-xl 
                           focus:ring-4 focus:ring-olive-light focus:border-olive 
                           transition-all duration-200 shadow-sm"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                  <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-8">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-600 text-center">{error}</p>
              </div>
            )}

            {!recipes ? (
              <div className="text-center py-16">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-olive mx-auto mb-4"></div>
                <p className="text-gray-600">Loading recipes...</p>
              </div>
            ) : (
              <>
                {/* Results Count */}
                {query && (
                  <div className="text-center">
                    <p className="text-gray-600">
                      Found {filtered.length} recipe{filtered.length !== 1 ? 's' : ''} 
                      {filtered.length === 20 && ' (showing first 20)'}
                    </p>
                  </div>
                )}

                {/* Results Grid */}
                {filtered.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filtered.map(r => (
                      <RecipeCard key={r._id} recipe={r} />
                    ))}
                  </div>
                ) : query ? (
                  <div className="text-center py-16">
                    <div className="text-gray-400 mb-4">
                      <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No recipes found</h3>
                    <p className="text-gray-600">Try searching with different keywords</p>
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <div className="text-gray-400 mb-4">
                      <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Start searching</h3>
                    <p className="text-gray-600">Enter a recipe name to find delicious meals</p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
