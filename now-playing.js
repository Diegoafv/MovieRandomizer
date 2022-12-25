import {
  API_KEY,
  BASE_URL,
  BASE_URL_DISCOVER,
  IMG_URL,
  language,
  region,
} from "./api.js";

const buttonsWrapper = document.querySelector(".map");
const slides = document.querySelector(".now-playing-movies");

const moviesList = document.querySelector(".now-playing-movies");
const url = `${BASE_URL}now_playing?${API_KEY}&${language}&${region}&page=1`;

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    let counter = 0;

    data.results.forEach((movie) => {
      if (counter < 15) {
        const movieCard = document.createElement("div");
        movieCard.classList.add("now-playing-card");
        movieCard.innerHTML = `<img src="${IMG_URL}${movie.poster_path}" alt="${movie.title}" class="movie-poster">`;

        const movieContent = document.createElement("div");
        movieContent.classList.add("content");
        const movieName = document.createElement("h3");
        movieName.innerHTML = movie.title;
        movieContent.appendChild(movieName);
        movieCard.appendChild(movieContent);

        moviesList.appendChild(movieCard);
        counter++;
      }
    });
  });

buttonsWrapper.addEventListener("click", (e) => {
  if (e.target.nodeName === "BUTTON") {
    Array.from(buttonsWrapper.children).forEach((item) =>
      item.classList.remove("active")
    );

    if (e.target.id === "first") {
      slides.style.transform = "translateX(-0%)";
      e.target.classList.add("active");
    } else if (e.target.id === "second") {
      slides.style.transform = "translateX(-20%)";
      e.target.classList.add("active");
    } else if (e.target.id === "third") {
      slides.style.transform = "translatex(-40%)";
      e.target.classList.add("active");
    } else if (e.target.id === "fourth") {
      slides.style.transform = "translatex(-60%)";
      e.target.classList.add("active");
    } else if (e.target.id === "fifth") {
      slides.style.transform = "translatex(-80%)";
      e.target.classList.add("active");
    }
  }
});
