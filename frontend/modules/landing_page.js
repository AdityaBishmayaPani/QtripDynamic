import config from "../conf/index.js";

async function init() {
<<<<<<< HEAD
<<<<<<< HEAD
  let cities = await fetchCities();

  // const loadAnim = document.getElementById('load');
  // loadAnim.remove();
  
=======
=======
>>>>>>> 04a35f749ba52a552d9f517016c4c27857cb4e5f
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();

  //Updates the DOM with the cities
<<<<<<< HEAD
>>>>>>> 04a35f749ba52a552d9f517016c4c27857cb4e5f
=======
>>>>>>> 04a35f749ba52a552d9f517016c4c27857cb4e5f
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

<<<<<<< HEAD
<<<<<<< HEAD
async function fetchCities() {
  try {
    let res = await fetch(config.backendEndpoint + "/cities");
    let data = res.json();
    return data;
  } catch (err) {
    return null;
  }
}

function addCityToDOM(id, city, description, image) {
  let parent = document.getElementById("data");
  let cityDiv = document.createElement("div");
  cityDiv.classList.add("col-lg-3", "col-12", "col-sm-6", "mb-4");
  cityDiv.innerHTML = `
  <a href="/pages/adventures/?city=${id}" id="${id}">
    <div class="tile">
      
        <img src="${image}" alt="City Image">
      
      <div class="tile-text text-center">
        <h5>${city}</h5>
        <p>${description}</p>
      </div>
    </div>
  </a>
  `;

  parent.appendChild(cityDiv);
}

export { init, fetchCities, addCityToDOM };
=======
=======
>>>>>>> 04a35f749ba52a552d9f517016c4c27857cb4e5f
//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data

}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM

}

export { init, fetchCities, addCityToDOM };
<<<<<<< HEAD
>>>>>>> 04a35f749ba52a552d9f517016c4c27857cb4e5f
=======
>>>>>>> 04a35f749ba52a552d9f517016c4c27857cb4e5f
