import tmdb from "./tmdb.config.js";

const popularTvUrl =
  tmdb.BASE_URL +
  tmdb.API_VERSION +
  tmdb.endpoints.popularTv +
  tmdb.API_KEY +
  tmdb.options.page +
  tmdb.options.page;

const topRatedTvUrl =
  tmdb.BASE_URL + tmdb.API_VERSION + tmdb.endpoints.topRatedTv + tmdb.API_KEY;

const getPopularTv = () => fetch(popularTvUrl).then(res => res.json());
const getImage = (path, size = "w500") => tmdb.base_url_image + size + path;

export default { getPopularTv, getImage };
