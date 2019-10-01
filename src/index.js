import api from "./services/api/index.js";
import card from "./card.js";
import initPagination from "./paggination.js";
import "./styles.css";
const root = document.getElementById("root");

document.addEventListener("DOMContentLoaded", initPagination, false);
const store = {
  movieFetched: {},
  error: {
    status: false,
    message: ""
  }
};

const popularNavBtn = document.querySelector("#popularBtn");
const topRateNavBtn = document.querySelector("#topRateBtn");

popularNavBtn.addEventListener("click", e => handleOnClickHeaderNavBtn(e));
topRateNavBtn.addEventListener("click", e => handleOnClickHeaderNavBtn(e));

async function handleOnClickHeaderNavBtn(e) {
  const buttonId = e.target.id;
  clearRootNode();

  if (buttonId === "popularBtn") {
    console.log(store);
    console.log("topRate");
    window.history.pushState(null, null, "popular");
    await fetchPopularTv();
    console.log(store);
    const list = document.createElement("ul");
    list.append(...generateMoviesListItems(store.movieFetched.results));
    root.append(list);
    root.append(
      paggination(store.movieFetched.page, store.movieFetched.total_pages)
    );
  }
  if (buttonId === "topRateBtn") {
    console.log(store);
    console.log("topRate");
    window.history.pushState(null, null, "top");
    await fetchTopRateMovies();
    console.log(store);
    const list = document.createElement("ul");
    list.append(...generateMoviesListItems(store.movieFetched.results));
    root.append(list);
    root.append(
      paggination(store.movieFetched.page, store.movieFetched.total_pages)
    );
  }
}

function clearRootNode() {
  root.innerHTML = "";
}

function handleMovieDetails(e, movieId) {
  e.preventDefault();

  console.log(window.history.pushState(null, null, movieId));
  // console.log(history.pushState(null, null, movieId));
  console.log("li click: ", e);
  console.log("movieId: ", movieId);
}
async function fetchTopRateMovies() {
  try {
    store.error.status = false;
    store.error.message = "";
    store.movieFetched = {};

    const getTopRatedTvData = await api.getTopRatrdTv();
    store.movieFetched = getTopRatedTvData;
  } catch (error) {
    console.log(error);
    store.error.status = true;
    store.error.message = error.message;
  }
}
async function fetchPopularTv() {
  try {
    store.error.status = false;
    store.error.message = "";
    store.movieFetched = {};
    const getPopularTvData = await api.getPopularTv();
    store.movieFetched = getPopularTvData;
  } catch (error) {
    console.log(error);
    store.error.status = true;
    store.error.message = error.message;
  }
}

function generateMoviesListItems(movies) {
  console.log(movies);
  const items = movies.map(movie => {
    return card(movie, handleMovieDetails);
  });
  console.log(items, items.length);
  return items;
}

(async function() {
  const pathname = window.location.pathname;
  if (pathname !== "/popular") {
    console.log(pathname);
    window.history.pushState(null, null, "popular");
  }

  await fetchPopularTv();

  const list = document.createElement("ul");
  list.append(...generateMoviesListItems(store.movieFetched.results));
  root.append(list);

  const paginationWrap = document.createElement("div");
  paginationWrap.id = "pagination";
  root.append(paginationWrap);
  initPagination(document.getElementById("pagination"), {
    size: store.movieFetched.total_pages, // pages size
    page: 1, // selected page
    step: 3 // pages before and after current
  });
})();
