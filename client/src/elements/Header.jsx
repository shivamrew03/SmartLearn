import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="bg-gray-800 text-white py-6 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-6xl font-bold">EduPlatform</h1>
        <nav className="space-x-8">
          <Link to="/" className="text-xl hover:text-gray-400 hover:scale-105 transition-transform duration-300">Home</Link>
          <Link to="/about" className="text-xl hover:text-gray-400 hover:scale-105 transition-transform duration-300">About</Link>
          <Link to="/contact" className="text-xl hover:text-gray-400 hover:scale-105 transition-transform duration-300">Contact</Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
