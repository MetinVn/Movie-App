const APIURL =
  "https://api.themoviedb.org/3/discover/movie?/sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH = "https://images.tmdb.org/t/p/w1280";
const SEARCHAPI =
  "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";
const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

getMovies(APIURL);
async function getMovies(url) {
  const resp = await fetch(url);
  const respData = await resp.json();
  searchMovies(respData.results);
}

function searchMovies(movies) {
  main.innerHTML = "";
  movies.forEach((movie) => {
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    movieEl.innerHTML = `
            <img src="${IMGPATH + movie.poster_path}" alt='${movie.title}'>
            <div class="movie-info">
                <h3>${movie.title}</h3>
                <span class="${getClassByRate(
                  movie.vote_average
                )}">${Math.trunc(movie.vote_average)}</span>   
            </div>
            <div class="overview">
            <h4>Release date: ${movie.release_date}</h4>
            <h4>Original Language: ${movie.original_language}</h4>
            <h2>Overview:</h2>
            ${movie.overview}
            </div>
        `;
    main.appendChild(movieEl);
  });
}

function getClassByRate(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = search.value;
  if (searchTerm) {
    getMovies(SEARCHAPI + searchTerm);
    search.value = "";
  }
});
