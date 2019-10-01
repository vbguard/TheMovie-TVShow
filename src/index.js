import api from "./services/api";
import card from "./card";

const root = document.getElementById("root");

const store = {
  movieFetched: {},
  error: {
    status: false,
    message: ""
  }
};

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
    return card(movie);
  });
  console.log(items);
  return items;
}

(async function() {
  await initFetchAndSave();
  console.log(store);
  const list = document.createElement("ul");
  list.append(...generateMoviesListItems(store.movieFetched.results));
  root.append(list);
})();
