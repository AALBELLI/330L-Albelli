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

const timeToggleButton = document.getElementById("time-toggle-button"); 
let is24HourFormat = false; 

let currentTemp = 3; 
let unit = "C"; 

function updateClock() {
  const now = new Date();

  let hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  let ampm = '';


  if (!is24HourFormat) {
    ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12; 
    hours = hours ? hours : 12; 
  }

  const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} ${ampm}`;
  clockElement.textContent = timeString.trim();
}

setInterval(updateClock, 1000);

function toggleTimeFormat() {
  is24HourFormat = !is24HourFormat;
  timeToggleButton.textContent = is24HourFormat ? '24-Hour' : '12-Hour';
  updateClock(); 
}

setInterval(updateClock, 1000); 

function showModule(module) {
  const modules = [temperatureDiv, fridgeDiv, tvDiv, browserDiv, weatherDiv, timerDiv, shoppingDiv];
  modules.forEach(m => m.classList.add('hidden'));
  if (module) module.classList.remove('hidden');
}

function toggleTemperature() {
  if (unit === "C") {
    tempValue.textContent = `Fridge: ${currentTemp}C | Freezer: ${currentTemp - 21}`;
    tempToggleButton.textContent = "Switch to F";
  } else {
    tempValue.textContent = `Fridge: ${currentTemp}F | Freezer: ${currentTemp - 21}`;
    tempToggleButton.textContent = "Switch to C";
  }
}

function increaseTemperature() {
  currentTemp++;
  toggleTemperature();
}

function decreaseTemperature() {
  currentTemp--;
  toggleTemperature();
}

function startTimer() {
  let remainingTime = 60;
  timerStatus.textContent = `Time remaining: ${remainingTime}s`;

  const timerInterval = setInterval(() => {
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
    addItemInput.value = ""; 
  }
}

onButton.addEventListener("click", () => {
  mainContent.style.display = "flex";
  showModule(null);  
});

offButton.addEventListener("click", () => {
  mainContent.style.display = "none";
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

tempToggleButton.addEventListener("click", () => {
  unit = (unit === "C") ? "F" : "C";
  toggleTemperature();
});

timeToggleButton.addEventListener("click", toggleTimeFormat);


increaseTempButton.addEventListener("click", increaseTemperature);
decreaseTempButton.addEventListener("click", decreaseTemperature);
startTimerButton.addEventListener("click", startTimer);


addItemButton.addEventListener("click", addItemToShoppingList);

onButton.addEventListener("click", () => {
  mainContent.style.display = "flex";
});

offButton.addEventListener("click", () => {
  mainContent.style.display = "none";  
});

updateClock();
