import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <h1>Movie Search</h1>
      <nav>
        <Link to="/">Search</Link>
        <Link to="/watchlist">My Watchlist</Link>
      </nav>
    </header>
  );
}

export default Header;
