import api from "./services/api";

export default function(movie) {
  const li = document.createElement("li");
  const img = document.createElement("img");
  img.src = api.getImage(movie.poster_path, "w200");
  img.alt = movie.name;
  const h2 = document.createElement("h2");
  h2.textContent = movie.name;
  li.insertAdjacentElement("beforeend", img);
  li.insertAdjacentElement("beforeend", h2);

  return li;
}
