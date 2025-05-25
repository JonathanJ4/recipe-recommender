import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-4xl mx-auto flex justify-between items-center py-4 px-6">
        <Link to="/" className="text-2xl font-bold flex items-center text-olive">
          <span role="img" aria-label="fork and knife"></span>
          <span className="ml-2">Recipe Hub</span>
        </Link>
        <nav className="space-x-4">
          <Link
            to="/"
            className="px-3 py-1 rounded hover:bg-olive-light hover:text-olive transition"
          >
            Home
          </Link>
          <Link
            to="/search"
            className="px-3 py-1 rounded hover:bg-olive-light hover:text-olive transition"
          >
            Search
          </Link>
        </nav>
      </div>
    </header>
  );
}
