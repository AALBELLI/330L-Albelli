const clockElement = document.getElementById("clock");
const onButton = document.getElementById("on-button");
const offButton = document.getElementById("off-button");
const mainContent = document.getElementById("main-content");
const temperatureButton = document.getElementById("temperature-button");
const fridgeButton = document.getElementById("fridge-button");
const tvButton = document.getElementById("tv-button");
const browserButton = document.getElementById("browser-button");
const weatherButton = document.getElementById("weather-button");
const timerButton = document.getElementById("timer-button");
const shoppingButton = document.getElementById("shopping-button");

const temperatureDiv = document.getElementById("temperature");
const fridgeDiv = document.getElementById("fridge-content");
const tvDiv = document.getElementById("tv-display");
const browserDiv = document.getElementById("browser-display");
const weatherDiv = document.getElementById("weather-display");
const timerDiv = document.getElementById("timer-display");
const shoppingDiv = document.getElementById("shopping-list");

const tempValue = document.getElementById("temp-value");
const tempToggleButton = document.getElementById("temp-toggle");
const increaseTempButton = document.getElementById("increase-temp");
const decreaseTempButton = document.getElementById("decrease-temp");
const startTimerButton = document.getElementById("start-timer");
const timerStatus = document.getElementById("timer-status");
const timerAlarm = document.getElementById("timer-alarm");
const addItemButton = document.getElementById("add-item-button");
const addItemInput = document.getElementById("add-item");
const listItems = document.getElementById("list-items");

let currentTempC = 3;
let currentTempF = 37.4;
let timerInterval;

function updateClock() {
  const now = new Date();
  clockElement.textContent = now.toLocaleTimeString();
}

setInterval(updateClock, 1000);

function showModule(module) {
  const modules = [temperatureDiv, fridgeDiv, tvDiv, browserDiv, weatherDiv, timerDiv, shoppingDiv];
  modules.forEach(m => m.classList.add('hidden'));
  if (module) module.classList.remove('hidden');
}

function toggleTemperature() {
  if (tempValue.textContent.includes("C")) {
    tempValue.textContent = `Fridge: ${currentTempF}F | Freezer: ${currentTempF - 21.8}F`;
    tempToggleButton.textContent = "Switch to C";
  } else {
    tempValue.textContent = `Fridge: ${currentTempC}C | Freezer: ${currentTempC - 21.8}C`;
    tempToggleButton.textContent = "Switch to F";
  }
}

function increaseTemperature() {
  currentTempC++;
  currentTempF = (currentTempC * 9 / 5) + 32;
  toggleTemperature();
}

function decreaseTemperature() {
  currentTempC--;
  currentTempF = (currentTempC * 9 / 5) + 32;
  toggleTemperature();
}

function startTimer() {
  let remainingTime = 60;
  timerStatus.textContent = `Time remaining: ${remainingTime}s`;

  timerInterval = setInterval(() => {
    remainingTime--;
    timerStatus.textContent = `Time remaining: ${remainingTime}s`;

    if (remainingTime <= 0) {
      clearInterval(timerInterval);
      timerAlarm.play();
    }
  }, 1000);
}

function addItemToShoppingList() {
  const itemText = addItemInput.value.trim();
  if (itemText !== "") {
    const newListItem = document.createElement("li");
    newListItem.textContent = itemText;
    listItems.appendChild(newListItem);
    addItemInput.value = ""; // Clear input field
  }
}

onButton.addEventListener("click", () => {
  mainContent.style.display = "flex";
  showModule(null);  //clear display except for clock
});

offButton.addEventListener("click", () => {
  mainContent.style.display = "none";  //hiding everything except the clock
});

temperatureButton.addEventListener("click", () => {
  showModule(temperatureDiv);  
});

fridgeButton.addEventListener("click", () => {
  showModule(fridgeDiv);  
});

tvButton.addEventListener("click", () => {
  showModule(tvDiv); 
  const tvSound = document.getElementById("tv-sound");
  tvSound.play();
});

browserButton.addEventListener("click", () => {
  showModule(browserDiv); 
});

weatherButton.addEventListener("click", () => {
  showModule(weatherDiv); 
});

timerButton.addEventListener("click", () => {
  showModule(timerDiv); 
});

shoppingButton.addEventListener("click", () => {
  showModule(shoppingDiv); 
});

tempToggleButton.addEventListener("click", toggleTemperature);
increaseTempButton.addEventListener("click", increaseTemperature);
decreaseTempButton.addEventListener("click", decreaseTemperature);
startTimerButton.addEventListener("click", startTimer);

// Add item to shopping list when the button is clicked
addItemButton.addEventListener("click", addItemToShoppingList);

updateClock();
