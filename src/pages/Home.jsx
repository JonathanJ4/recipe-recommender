import Header from '../components/Header.jsx';
import Hero   from '../components/Hero.jsx';
import TrendingRecipes from '../components/TrendingRecipes.jsx';

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <TrendingRecipes />

      {/* Explore More */}
      <section className="max-w-4xl mx-auto px-6 py-10">
        <h3 className="text-2xl font-semibold mb-4">Explore More</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>Filling Breakfast Ideas</li>
          <li>Delicious Lunch Recipes</li>
          <li>Cozy Dinner Ideas</li>
        </ul>
      </section>

      {/* Call to Action */}
      <section className="bg-white">
        <div className="max-w-4xl mx-auto text-center py-10 px-6">
          <h3 className="text-2xl font-semibold mb-4">Find your next meal</h3>
          <a
            href="/search"
            className="inline-block bg-olive text-white font-medium px-6 py-3 rounded-lg hover:bg-olive-light transition"
          >
            Start Searching
          </a>
        </div>
      </section>
    </>
  );
}
