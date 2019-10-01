import api from "./services/api/index.js";

export default function(movie, handleMovieDetails) {
  const li = document.createElement("li");
  const img = document.createElement("img");
  img.src = api.getImage(movie.poster_path, "w200");
  img.alt = movie.name;
  const h2 = document.createElement("h2");
  h2.textContent = movie.name;
  const vote = document.createElement("span");
  vote.textContent = movie.vote_average;
  const year = document.createElement("span");
  year.textContent = new Date(movie.first_air_date).toLocaleDateString();
  li.insertAdjacentElement("beforeend", img);
  li.insertAdjacentElement("beforeend", h2);
  li.insertAdjacentElement("beforeend", vote);
  li.insertAdjacentElement("beforeend", year);

  li.addEventListener("click", e => handleMovieDetails(e, movie.id));
  return li;
}
