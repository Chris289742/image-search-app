const accessKey = "t6Q-Q1I8x2V3CFy5kalR0U8aLUhI_a9UtD0XXR570rs";

const formEl = document.querySelector("form");
const searchInputEl = document.getElementById("search-input");
const searchResultsEl = document.querySelector(".search-results");
const showMoreBtnEl = document.getElementById("show-more-button");

let page = 1;
let inputData = "";

async function searchImages() {
  inputData = searchInputEl.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

  const response = await fetch(url);
  const data = await response.json();
  const results = data.results;

  if (page === 1) {
    searchResultsEl.innerHTML = ""; // remove the last time results
  }

  results.forEach((result) => {
    const imageWrapper = document.createElement("div");
    imageWrapper.classList.add("search-result");

    const image = document.createElement("img");
    image.src = result.urls.small;
    image.alt = result.description || "Image";

    const imageLink = document.createElement("a");
    imageLink.href = result.links.html;
    imageLink.target = "_blank";
    imageLink.innerHTML =
      "<span style='font-weight: 600; color: blue '>Description:</span> " +
      (result.alt_description || "View Image");

    // result.alt_description || "View Image";

    imageWrapper.appendChild(image);
    imageWrapper.appendChild(imageLink);
    searchResultsEl.appendChild(imageWrapper);
  });

  page++;

  if (page > 1) {
    showMoreBtnEl.style.display = "block";
  }
}

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1;
  searchImages();
});

showMoreBtnEl.addEventListener("click", () => {
  searchImages();
});
