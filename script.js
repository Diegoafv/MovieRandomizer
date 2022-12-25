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
      //show movie info and get poster url
      movieName.innerHTML = data.results[randomResult].title;
      movieDescription.innerHTML = data.results[randomResult].overview;
      moviePoster.src = `${IMG_URL}${data.results[randomResult].poster_path}`;

      const video = document.querySelector("#video");
      const trailerNotAvailable = document.querySelector(
        "#trailer-not-available"
      );

      //reset iframe to show video
      video.style.display = "flex";
      trailerNotAvailable.style.display = "none";

      //get video url
      const videoId = data.results[randomResult].id;
      const videoURL = `${BASE_URL}${videoId}/videos?${API_KEY}&${language}`;

      fetch(videoURL)
        .then((res) => res.json())
        .then((dt) => {
          const videoKey = dt.results[0].key;

          //iframe setup
          video.src = `https://www.youtube.com/embed/${videoKey}`;
          video.width = movieSection.offsetWidth;
          video.height = video.width / 1.78;
          video.title = "YouTube video player";
          video.frameborder = "0";
          video.allow =
            "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
          video.allowfullscreen = "true";
        })
        .then(() => {
          if (!document.querySelector("#video").src) {
            throw new Error("No video found");
          }
        })
        .catch((err) => {
          console.log("No video found " + err);

          //if no video found, show "trailer not available" image
          trailerNotAvailable.style.width = movieSection.offsetWidth + "px";
          trailerNotAvailable.style.height =
            trailerNotAvailable.style.width / 1.78 + "px";
          trailerNotAvailable.style.display = "flex";

          //hide iframe
          video.style.display = "none";
        });
    })
    .then(() => {
      movieSection.style.display = "flex";
    });
});

seeTrailerButton.addEventListener("click", () => {
  const trailerContainer = document.querySelector(".trailer-container");
  const seeTrailerImg = document.querySelector("#see-trailer-img");
  const seeTrailerText = document.querySelector("#see-trailer-text");

  //disable container
  if (trailerContainer.classList.contains("trailer-container-active")) {
    trailerContainer.classList.remove("trailer-container-active");
    //trailerContainer.style.display = "none";
    trailerContainer.style.maxHeight = "0px";
    seeTrailerImg.src = "/assets/arrow-down.svg";
    seeTrailerText.innerHTML = "See trailer";
    return;
  }
  //enable container
  trailerContainer.classList.add("trailer-container-active");
  //trailerContainer.style.display = "flex";
  trailerContainer.style.maxHeight =
    document.querySelector("#video").height + "px";
  seeTrailerImg.src = "/assets/arrow-up.svg";
  seeTrailerText.innerHTML = "Hide trailer";
});
