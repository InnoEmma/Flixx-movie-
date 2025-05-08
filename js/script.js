const global = { currentPage: window.location.pathname };

//  Highlight active link
function highlightActiveLink() {
  const link = document.querySelectorAll(".nav-link");
  link.forEach((link) => {
    if (link.getAttribute("href") === global.currentPage) {
      link.classList.add("active");
    }
  });
}
const API_KEY = `2a857ff9766de4a9db544852e5c0853b`;

// Fetch data form TMDB API

async function getPopularMovies() {
  const url =
    "https://api.themoviedb.org/3/discover/movie?api_key=2a857ff9766de4a9db544852e5c0853b&sort_by=popularity.desc&include_adult=true&include_video=false&page=1";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: "Bearer 2a857ff9766de4a9db544852e5c0853b",
    },
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    displayMovies(data.results);
  } catch (error) {
    console.error("Failed to the popular movies", error);
  }
}

function displayMovies(movies) {
  const movieContainer = document.getElementById("popular-movies");
  // const movieContainer = document.getElementById("popular-shows");
  movieContainer.innerHTML = "";

  movies.forEach((movie) => {
    const movieCard = document.createElement("div");
    movieCard.classList.add("card");

    const movieLink = document.createElement("a");
    movieLink.href = `movie-details.html?id=${movie.id}`;
    console.log(movieLink);

    const movieImage = document.createElement("img");
    // movieImage.classList.add("card-img-top");
    movieImage.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    movieImage.alt = movie.title;
    movieLink.appendChild(movieImage);

    const movieBody = document.createElement("div");
    movieBody.classList.add("card-body");

    const movieTitle = document.createElement("h5");
    movieTitle.classList.add("card-title");
    movieTitle.textContent = movie.title;
    movieBody.appendChild(movieTitle);

    const MovieReleaseDate = document.createElement("p");
    MovieReleaseDate.innerHTML = `<small class="text-muted"> Release: ${movie.release_date}</small>`;
    movieBody.appendChild(MovieReleaseDate);

    movieCard.appendChild(movieLink);

    movieCard.appendChild(movieBody);
    movieContainer.appendChild(movieCard);
  });
}

async function getMovieDetails() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const movieId = urlParams.get("id");
  const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=2a857ff9766de4a9db544852e5c0853b&sort_by=popularity.desc&include_adult=true&include_video=false&page=1`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: "Bearer 2a857ff9766de4a9db544852e5c0853b",
    },
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    console.log(data);

    displayMoviesDetails(data);
  } catch (error) {
    console.error("Failed to the popular movies", error);
  }
}

function displayMoviesDetails(movie) {
  const overlay = document.createElement("div");
  overlay.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`;
  overlay.style.backgroundSize = "cover";
  overlay.style.backgroundPosition = "center";
  overlay.style.backgroundRepeat = "no-repeat";
  overlay.style.height = "100vh";
  overlay.style.width = "100vw";
  overlay.style.position = "fixed";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.zIndex = "-1";
  overlay.style.opacity = "0.2";
  console.log(overlay);
  document.body.appendChild(overlay);

  const MovieDetails = document.getElementById("movie-details");
  MovieDetails.classList.add("movie-details");

  const MovieDetailsSection = document.querySelector(".details-top");

  const Image = document.querySelector(".card-img-top");

  Image.src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;

  const title = document.querySelector(".movie-title");
  title.textContent = movie.original_title;
  const detailMovie = document.querySelector(".details-movie");

  const movieInfo = document.querySelector(".movie-info");
  movieInfo.textContent = movie.overview;

  const rating = document.querySelector(".rating");
  rating.textContent = `${movie.vote_average}/10 `;

  const date = document.querySelector(".text-muted");
  date.textContent = movie.release_date;

  const ListGroup = document.querySelector(".list-group");
  ListGroup.innerHTML = "";
  movie.genres.forEach((item) => {
    const listitem = document.createElement("li");
    listitem.classList.add("list-group");
    listitem.textContent = item.name;
    ListGroup.appendChild(listitem);
  });

  const budget = document.getElementById("budget").parentElement.childNodes[2];
  budget.textContent = ` $${movie.budget}`;

  const revenue =
    document.getElementById("Revenue").parentElement.childNodes[2];
  revenue.textContent = ` $${movie.revenue}`;

  const runtime =
    document.getElementById("Runtime").parentElement.childNodes[2];
  runtime.textContent = ` ${movie.runtime} minutes`;

  const companies_ = document.querySelector(".companies");
  movie.production_companies.forEach((companies) => {
    companies_.textContent += companies.name + ",";
  });
}

async function getTvShows() {
  const url = `https://api.themoviedb.org/3/discover/tv?api_key=2a857ff9766de4a9db544852e5c0853b&sort_by=popularity.desc&include_adult=true&include_video=false&page=1`;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer 2a857ff9766de4a9db544852e5c0853b`,
    },
  };

  try {
    const TV = await fetch(url, options);
    const data = await TV.json();
    console.log(data.results);
    displayTvShows(data.results);
  } catch (error) {
    console.log(`The error is ${error}`);
  }
}

function displayTvShows(shows) {
  const PopularShow = document.getElementById("popular-shows");
  PopularShow.innerHTML = "";
  // grid.classList.add("grid");
  shows.forEach((show) => {
    const card = document.createElement("div");
    card.classList.add("card");

    const link = document.createElement("a");
    link.href = `tv-details.html?id=${show.id}`;

    const image = document.createElement("img");
    image.classList.add("card-img-top");
    image.src = `https://image.tmdb.org/t/p/w500/${show.poster_path}`;
    image.alt = show.title;

    link.appendChild(image);

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    const title = document.createElement("h5");
    title.classList.add("card-title");
    title.textContent = show.original_name;

    cardBody.appendChild(title);

    const p = document.createElement("p");
    p.innerHTML = `<small class="text-muted">Aired: ${show.first_air_date}</small>`;
    cardBody.appendChild(p);

    card.appendChild(link);
    card.appendChild(cardBody);
    PopularShow.appendChild(card);
  });
}

async function getTvShowsDetails() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const seriesId = urlParams.get("id");

  const url = `https://api.themoviedb.org/3/tv/${seriesId}?api_key=2a857ff9766de4a9db544852e5c0853b&sort_by=popularity.desc&include_adult=true&include_video=false&page=1`;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: "Bearer 2a857ff9766de4a9db544852e5c0853b",
    },
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    console.log(data);
    displayTvShowsDetail(data);
  } catch (error) {
    console.log(`The error is ${error}`);
  }
}

function displayTvShowsDetail(show) {
  const overlay = document.createElement("div");
  overlay.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${show.backdrop_path})`;
  overlay.style.backgroundSize = "cover";
  overlay.style.backgroundPosition = "center";
  overlay.style.backgroundRepeat = "no-repeat";
  overlay.style.height = "100vh";
  overlay.style.width = "100vw";
  overlay.style.position = "fixed";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.zIndex = "-1";
  overlay.style.opacity = "0.2";
  console.log(overlay);
  document.body.appendChild(overlay);

  const image = document.querySelector(".card-img-top");
  image.src = `https://image.tmdb.org/t/p/w500/${show.poster_path}`;

  const title = document.querySelector(".show-name");
  title.textContent = show.original_name;

  const rating = document.querySelector(".rating");

  // rating.textContent = show;

  const release_date = document.querySelector(".text-muted");
  release_date.innerHTML = `<p class="text-muted">Release Date: ${show.first_air_date}</p>`;

  const overview = document.querySelector(".overview");
  overview.textContent = show.overview;

  const ListGroup = document.querySelector(".list-group");
  ListGroup.innerHTML = "";
  show.genres.forEach((e) => {
    const li = document.createElement("li");
    li.textContent = e.name;
    ListGroup.appendChild(li);
  });

  const detailBottom = document.querySelector(
    ".details-bottom li:nth-child(2)"
  );

  const last = document.querySelector(".details-bottom li:nth-child(2)");
  const last_ = last.childNodes[2];
  console.log(last_);
  console.log(show.last_episode_to_air.name);
  last_.textContent = show.last_episode_to_air.name;

  const episode = document.querySelector(".details-bottom li").childNodes[1];
  const length = show.number_of_episodes;
  episode.textContent = length;

  const production_companies = document.querySelector(".pro");

  production_companies.textContent = "";
  show.production_companies.forEach((e) => {
    production_companies.textContent += e.name + " ,";
  });
}

const radios = document.querySelectorAll('input[name="type"]');
// console.log(radios);
radios.forEach((radio) => {
  radio.addEventListener("change", (event) => {
    // console.log(event.target.value);
    const selectedValue = event.target.value;
    if (selectedValue === "tv") {
      console.log("you have selected tv");
    } else if (selectedValue === "movie") {
      console.log("You selected movie");
      searchBtn();
    }
  });
});

// btn.addEventListener("click", Search);
// function Search(event) {
//   event.preventDefault();
//   const search1 = document.querySelector("#search-term");
//   const search2 = search1.value;
//   console.log(search2);
// }

function searchBtn() {
  const btn = document.querySelector(".btn");
  btn.addEventListener("click", searchMovie);
}

async function searchMovie(event) {
  if (event) event.preventDefault();
  // event.preventDefault()
  const search3 = document.querySelector("#search-term");
  const search4 = search3.value;
  const query = search4;
  // const query = 'batman'
  const type = document.querySelector('input[name="type"]:checked').value;
  console.log(type);
  const url = `https://api.themoviedb.org/3/search/${type}?api_key=2a857ff9766de4a9db544852e5c0853b&query=${query}&sort_by=popularity.desc&include_adult=true&include_video=false&page=1`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    // console.log(data);
    displaySearchMovie(data);
  } catch (error) {
    console.log(`The error is ${error}`);
  }
}

function displaySearchMovie(search) {
  // console.log(search.results);
  const searchResult = document.querySelector(".searching");
  searchResult.innerHTML = "";
  // console.log(searchResult);
  // console.log(search.results);
  let results = search.results;
  console.log(results);
  results.forEach((superman) => {
    const searchResult2 = document.querySelector(".searching");
    const card = document.createElement("div");
    card.classList.add("card");
    const link = document.createElement("a");
    link.href = `movie-details.html?id=${superman.id}`;
    console.log(link);
    const image = document.createElement("img");
    image.src = `https://image.tmdb.org/t/p/w500${superman.poster_path}`;
    image.classList.add("card-img-top");
    // console.log(image);
    link.appendChild(image);
    card.appendChild(image);

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    const h5 = document.createElement("h5");
    h5.classList.add("card-title");
    h5.textContent = superman.original_title || superman.name;
    cardBody.appendChild(h5);

    const p = document.createElement("p");
    p.classList.add("card-text");
    p.innerHTML = `<small class="text-muted">Release: ${
      superman.release_date || superman.first_air_date
    }</small>`;
    cardBody.appendChild(p);
    card.appendChild(cardBody);
    searchResult2.appendChild(card);
  });
  results = "";
  console.log(results);

  searchBtn();
}

// // Init app (the router)
function Init() {
  switch (global.currentPage) {
    case "/":
    case "/index.html":
      // console.log("Home page loaded");
      getPopularMovies();
      break;
    case "/shows.html":
      console.log("Shows page loaded");
      getTvShows();
      break;
    case "/movie-details.html":
      console.log("Movie details page loaded");
      getMovieDetails();

      break;
    case "/tv-details.html":
      console.log("TV details page loaded");
      getTvShowsDetails();
      break;
    case "/search.html":
      searchMovie();
      console.log("Search page loaded");
      break;
  }
  highlightActiveLink();
}

document.addEventListener("DOMContentLoaded", Init);
// searchBtn();
