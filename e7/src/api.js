const API_KEY = '3ad3dd80';

async function searchMovies(title) {
  const response = await fetch(
    `http://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(title)}`
  );
  const json = await response.json();

  if (json.Response === 'True') {
    return json.Search;
  }

  return [];
}

export { searchMovies };
