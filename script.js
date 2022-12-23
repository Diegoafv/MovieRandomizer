import {
  API_KEY,
  BASE_URL,
  BASE_URL_DISCOVER,
  IMG_URL,
  language,
} from "./api.js";

const findMovieButton = document.querySelector("#find-movie-button");

const seeTrailerButton = document.querySelector("#see-trailer-button");

findMovieButton.addEventListener("click", () => {
  const movieSection = document.querySelector(".movie-section");

  const movieName = document.querySelector("#movie-name");
  const movieDescription = document.querySelector("#movie-description");
  const moviePoster = document.querySelector("#movie-poster");

  //random page from 1 to 500
  const randomPage = Math.floor(Math.random() * 500) + 1;

  //random result in the page from 0 to 19
  const randomResult = Math.floor(Math.random() * 20);

  const url = `${BASE_URL_DISCOVER}?${API_KEY}&page=${randomPage}&${language}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      movieName.innerHTML = data.results[randomResult].title;
      movieDescription.innerHTML = data.results[randomResult].overview;
      moviePoster.src = `${IMG_URL}${data.results[randomResult].poster_path}`;

      const videoId = data.results[randomResult].id;
      const videoURL = `${BASE_URL}${videoId}/videos?${API_KEY}&${language}`;

      fetch(videoURL)
        .then((res) => res.json())
        .then((dt) => {
          const videoKey = dt.results[0].key;
          const video = document.querySelector("#video");
          video.src = `https://www.youtube.com/embed/${videoKey}`;
          video.width = movieSection.offsetWidth;
          video.height = video.width / 1.78;
          video.title = "YouTube video player";
          video.frameborder = "0";
          video.allow =
            "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
          video.allowfullscreen = "true";
        })
        .then(() => {});
    })
    .then(() => {
      movieSection.style.display = "flex";
    });
});

seeTrailerButton.addEventListener("click", () => {
  const trailerContainer = document.querySelector(".trailer-container");
  const seeTrailerImg = document.querySelector("#see-trailer-img");
  const seeTrailerText = document.querySelector("#see-trailer-text");

  if (trailerContainer.classList.contains("trailer-container-active")) {
    trailerContainer.classList.remove("trailer-container-active");
    //trailerContainer.style.display = "none";
    trailerContainer.style.maxHeight = "0px";
    seeTrailerImg.src = "/assets/arrow-down.svg";
    seeTrailerText.innerHTML = "See trailer";
    return;
  }
  trailerContainer.classList.add("trailer-container-active");
  //trailerContainer.style.display = "flex";
  trailerContainer.style.maxHeight = "600px";
  seeTrailerImg.src = "/assets/arrow-up.svg";
  seeTrailerText.innerHTML = "Hide trailer";
});
