import { useState } from 'react';
import MovieCard from './MovieCard';
import { searchMovies } from './api';

const WATCHLIST_KEY = 'e6_watchlist';

function SearchPage() {
  const [searchText, setSearchText] = useState('');
  const [movies, setMovies] = useState([]);

  async function handleSearch() {
    if (!searchText.trim()) return;
    const results = await searchMovies(searchText);
    setMovies(results);
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') handleSearch();
  }

  function handleAdd(movie) {
    const watchlist = JSON.parse(localStorage.getItem(WATCHLIST_KEY)) || {};
    watchlist[movie.imdbID] = movie;
    localStorage.setItem(WATCHLIST_KEY, JSON.stringify(watchlist));
  }

  return (
    <main>
      <section className="search">
        <input
          type="text"
          id="searchInput"
          placeholder="Enter movie title..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button id="searchBtn" onClick={handleSearch}>Search</button>
      </section>

      <section className="movie-list">
        {movies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} onAdd={handleAdd} />
        ))}
      </section>
    </main>
  );
}

export default SearchPage;
