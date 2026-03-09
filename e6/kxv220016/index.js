// Kxv220016

/** Deals with creating, storing, and showing movie details
 */
class Movie {
  static movie_list = document.querySelector('section.movie-list');

  constructor(id, name, img_link, year, type) {
    this.id = id;
    this.name = name;
    this.img_link = img_link;
    this.year = year;
    this.type = type;
  }

  /** Add the current movie to watchlist in localStorage
   */
  add_movie_to_watchlist() {
    // wanna be safe, idk if there is other watchlist store in my
    // localStorage, probably not though since more likely
    // it's either cookie or server stores it
    const watchlist_obj = JSON.parse(localStorage.getItem("e6_watchlist")) || {};
    watchlist_obj[this.id] = {
      imdbID: this.id,
      Title: this.name,
      Poster: this.img_link,
      Year: this.year,
      Type: this.type
    }

    localStorage.setItem("e6_watchlist", JSON.stringify(watchlist_obj));
  }

  

  /** Turns an object of specific properties to Movie instance
   * @param {Object} object
   * @param {string} object.imdbID
   * @param {string} object.Title
   * @param {string} object.Poster
   * @param {string} object.Year
   * @param {string} object.Type
   * @returns {Movie} the movie representing the object
   */
  static get_movie_from_object(object) {
    return new Movie(
      object.imdbID, 
      object.Title,
      object.Poster,
      Number(object.Year),
      object.Type);
  }

  /** Append a movie to the list of movies
   * @param {Movie} movie to be added
   */
  static append_to_html_movie_list(movie) {
    const movie_div = movie.to_html_structure();
    Movie.movie_list.appendChild(movie_div);
  }

  static clear_html_movie_list() {
    Movie.movie_list.innerHTML = "";
  }

  /** Construct an HTML node from the current Movie instance
   *
   * @returns {HTMLDivElement} the HTML div constructed from the Movie instance
   */
  to_html_structure() {
    const movie_div = document.createElement("div");
    movie_div.classList.add("movie-card");
    
    const img_tag = document.createElement("img");
    img_tag.src = this.img_link;
    img_tag.alt = "Img not loaded";

    const info_div = document.createElement("div");
    info_div.classList.add("movie-info");

    const name_text = document.createElement("h5");
    name_text.textContent = this.name;

    const year_text = document.createElement("p");
    year_text.textContent = "YEAR: " + this.year.toString();

    const type_text = document.createElement("p");
    type_text.textContent = "TYPE: " + this.type;

    const btn = document.createElement("button");
    btn.classList.add("add-btn");
    btn.textContent = "+";
    btn.addEventListener("click", () => this.add_movie_to_watchlist())

    const label = document.createElement("label");
    label.textContent = "Add to watchlist";

    info_div.appendChild(name_text);
    info_div.appendChild(year_text);
    info_div.appendChild(type_text);
    info_div.appendChild(btn);
    info_div.appendChild(label);

    movie_div.appendChild(img_tag);
    movie_div.appendChild(info_div);

    return movie_div;
  }
}

class Movie_Searcher {
  constructor() {
    this.API_KEY = "3ad3dd80";
    this.searched_movies = [];
    this.search_btn = document.getElementById("searchBtn");
    this.search_input = document.getElementById("searchInput");
    this.search_btn.addEventListener("click", () => this.find_movie(this.search_input.value));
  }

  async find_movie(title) {
    // a bit inefficient, but let's structure it like this:
    // x = find the result count
    // for i in range(x div 10):
    // iterate through the pages, append to searched_movies

    Movie.clear_html_movie_list();

    const movies = await fetch(`http://www.omdbapi.com/?apikey=${this.API_KEY}&s=${title}`)
      .then(result => result.json())
      .then(json => {
        if (json["Response"] === "True")
          return json.Search;
        return [];
      });

    if (movies.length === 0)
      return;

    movies.forEach(movie_obj => {
      const movie = Movie.get_movie_from_object(movie_obj);
      this.searched_movies.push(movie);
      Movie.append_to_html_movie_list(movie);
    })
  }
}

const movie_searcher = new Movie_Searcher();
