// src/components/SearchFilters.jsx
export default function SearchFilters({ query, setQuery, mealType, setMealType }) {
  return (
    <div className="mb-4 flex space-x-4">
      <select
        value={mealType}
        onChange={e => setMealType(e.target.value)}
        className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-olive-light focus:border-olive"
      >
        <option value="">All Meals</option>
        <option value="breakfast">Breakfast</option>
        <option value="lunch">Lunch</option>
        <option value="dinner">Dinner</option>
      </select>

      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search recipes by title..."
        className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-olive-light focus:border-olive"
      />
    </div>
  );
}
