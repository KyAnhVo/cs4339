import { useState, useEffect } from 'react';
import MovieCard from './MovieCard';

const WATCHLIST_KEY = 'e6_watchlist';

function WatchlistPage() {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(WATCHLIST_KEY)) || {};
    setWatchlist(Object.values(stored));
  }, []);

  function handleRemove(imdbID) {
    const stored = JSON.parse(localStorage.getItem(WATCHLIST_KEY)) || {};
    delete stored[imdbID];
    localStorage.setItem(WATCHLIST_KEY, JSON.stringify(stored));
    setWatchlist(Object.values(stored));
  }

  return (
    <main>
      <section className="movie-list">
        {watchlist.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} onRemove={handleRemove} />
        ))}
      </section>
    </main>
  );
}

export default WatchlistPage;
