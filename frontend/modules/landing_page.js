import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();

  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  try {
    let response = await fetch(config.backendEndpoint + "/cities");
    let citiesData = await response.json();
    return citiesData;
  } catch (error) {
    console.log(`Error is : ${error}`);
    return null;
  }
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  let dataElem = document.getElementById("data");
  dataElem.innerHTML += `<div class="col-6 col-lg-3 mb-4">
  <a href="pages/adventures/?city=${id}" id="${id}">
      <div class="tile text-white">
      <div class="text-center tile-text">
        <h5>${city}</h5>
        <p>${description}</p>
      </div>
      <img src="${image}" alt="">
    </div>
  </a>
</div>`;
  // 1. Populate the City details and insert those details into the DOM
}

export { init, fetchCities, addCityToDOM };
