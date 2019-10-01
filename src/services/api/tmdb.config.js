const tmdbConfig = {
  API_KEY: "?api_key=4aa539255aa0c2506cf45806a15a8a0a",
  BASE_URL: "https://api.themoviedb.org/",
  API_VERSION: "3",
  endpoints: {
    popularTv: "/tv/popular",
    topRatedTv: "/tv/top_rated"
  },
  options: {
    page: "&page=1",
    language: "&language=en-US"
  },
  base_url_image: "https://image.tmdb.org/t/p/"
};
export default tmdbConfig;
