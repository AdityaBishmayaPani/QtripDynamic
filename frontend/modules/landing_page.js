import config from "../conf/index.js";

async function init() {
  let cities = await fetchCities();

  // const loadAnim = document.getElementById('load');
  // loadAnim.remove();
  
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

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