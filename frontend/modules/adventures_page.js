import config from "../conf/index.js";

function getCityFromURL(search) {
  return search.split("=")[1];
}

async function fetchAdventures(city) {
  try {
    let res = await fetch(config.backendEndpoint + "/adventures?city=" + city);

    

    return res.json();
  } catch (error) {
    console.log(error);
    return null;
  }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  let parent = document.getElementById("data");
  parent.innerHTML = ``; // to clear pre-existing data if exists any
  let mainActivityDiv = document.createElement("div");
  mainActivityDiv.classList.add("row", "container-fluid", "mx-auto");

  adventures.forEach((activity) => {
    const { id, name, costPerHead, currency, image, duration, category } =
      activity;
    let insideActivityDiv = document.createElement("div");
    insideActivityDiv.classList.add("col-lg-3", "col-12", "col-sm-6", "mt-4");
    insideActivityDiv.innerHTML = `
      <a href="detail/?adventure=${id}" id="${id}">
        <div class="card activity-card">
          <img src="${image}" alt="Adventure Activity Card">
          <div class="adventure-detail-card">
            <div class="d-flex justify-content-between align-items-evenly">
              <h5>${name}</h5>
              <p style="font-weight: 400;">₹${costPerHead}</p>
            </div>
            <div class="d-flex justify-content-between align-items-evenly">
              <h5>Duration</h5>
              <p style="font-weight: 400;">${duration}Hours</p>
            </div>
          </div>
          <div class="category-banner">
            ${category}
          </div>
        </div>
      </a>
    `;
    mainActivityDiv.appendChild(insideActivityDiv);
  });
  parent.appendChild(mainActivityDiv);
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  let durationFilteredList = list.filter((elem) => {
    return elem.duration >= low && elem.duration <= high;
  });
  return durationFilteredList;
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  let categoryFilteredList = list.filter((elem) => {
    return categoryList.includes(elem.category);
  });
  return categoryFilteredList;
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods

  // Checking for the Duration option
  if (filters.duration !== "") {
    // we have only duration to filter
    const [low, high] = filters.duration.split("-");
    list = filterByDuration(list, low, high);
    // return durationFilteredList;
  }

  // Checking for the Category list
  if (filters.category.length !== 0) {
    // we have only categories to filter
    list = filterByCategory(list, filters.category);
    // return categoryFilteredList;
  }
  return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  localStorage.setItem("filters", JSON.stringify(filters));
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  let filterString = localStorage.getItem("filters");
  return JSON.parse(filterString);
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  // console.log("filters:", filters);

  // to update duration option if the same is stored in localStorage
  const durationSelect = document.getElementById("duration-select");
  if (filters.duration !== "") {
    if (filters.duration === "0-2") durationSelect.selectedIndex = 1;
    else if (filters.duration === "2-6") durationSelect.selectedIndex = 2;
    else if (filters.duration === "6-12") durationSelect.selectedIndex = 3;
    else durationSelect.selectedIndex = 4;
  }

  let pillSectionParent = document.getElementById("category-list");
  pillSectionParent.innerHTML = ``; // to clear pre-existing data if exists any
  filters.category.forEach((elem) => {
    let pills = document.createElement("div");
    pills.textContent = elem;
    pills.classList.add("category-filter");

    let removeButtonSpan = document.createElement("span");
    removeButtonSpan.setAttribute("onclick", "removeFilterPills(this)");
    removeButtonSpan.textContent = "X";
    removeButtonSpan.classList.add("remove-pill-button");
    pills.appendChild(removeButtonSpan);
    pillSectionParent.appendChild(pills);
  });
}

export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
