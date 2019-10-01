import api from "./services/api/index.js";
import card from "./card.js";
import "./styles.css";
const root = document.getElementById("root");

const store = {
  movieFetched: {},
  error: {
    status: false,
    message: ""
  }
};

function handleMovieDetails(e, movieId) {
  console.log(window.history.pushState(null, null, movieId));
  // console.log(history.pushState(null, null, movieId));
  console.log("li click: ", e);
  console.log("movieId: ", movieId);
}

async function initFetchAndSave() {
  try {
    store.error.status = false;
    store.error.message = "";

    const getPopularTvData = await api.getPopularTv();
    store.movieFetched = getPopularTvData;
  } catch (error) {
    console.log(error);
    store.error.status = true;
    store.error.message = error.message;
  }
}

function generateMoviesListItems(movies) {
  const items = movies.map(movie => {
    return card(movie, handleMovieDetails);
  });
  console.log(items);
  return items;
}

(async function() {

  const pathname = window.location.pathname;
  if (pathname === "/") {
    window.history.pushState(null, null, "popular");
  }

  await initFetchAndSave();

  console.log(store);

  const list = document.createElement("ul");
  list.append(...generateMoviesListItems(store.movieFetched.results));
  
  root.append(list);
})();
