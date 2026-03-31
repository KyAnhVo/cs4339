function MovieCard({ movie, onAdd, onRemove }) {
  const { Title, Poster, Year, Type } = movie;

  return (
    <div className="movie-card">
      <img src={Poster} alt={`${Title} poster`} />
      <div className="movie-info">
        <h5>{Title}</h5>
        <p>YEAR: {Year}</p>
        <p>TYPE: {Type}</p>
        {onAdd && (
          <>
            <button className="add-btn" onClick={() => onAdd(movie)}>+</button>
            <label>Add to watchlist</label>
          </>
        )}
        {onRemove && (
          <>
            <button className="add-btn" onClick={() => onRemove(movie.imdbID)}>-</button>
            <label>Remove from watchlist</label>
          </>
        )}
      </div>
    </div>
  );
}

export default MovieCard;
