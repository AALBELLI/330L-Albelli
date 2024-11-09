const clockElement = document.getElementById("clock");
let is24HourFormat = true;
const tempValue = document.getElementById("temp-value");
let tempCelsius = true;
let temperature = 3;

function updateClock() {
  const now = new Date();
  const hours = is24HourFormat ? now.getHours() : (now.getHours() % 12 || 12);
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  clockElement.textContent = `${hours}:${minutes}:${seconds}`;
}

function toggleTimeFormat() {
  is24HourFormat = !is24HourFormat;
}

function showModule(module) {
  const modules = ["temperature", "fridge-content", "weather-display", "timer-display", "shopping-list", "tv-display", "browser-display", "music-player"];
  modules.forEach(id => document.getElementById(id).classList.add("hidden"));
  document.getElementById(`${module}-display`).classList.remove("hidden");
}

function toggleTempUnit() {
  temperature = tempCelsius ? (temperature * 9 / 5) + 32 : (temperature - 32) * 5 / 9;
  tempValue.textContent = Math.round(temperature);
  tempCelsius = !tempCelsius;
}

function adjustTemperature(change) {
  temperature += tempCelsius ? change : change * 9 / 5;
  tempValue.textContent = Math.round(temperature);
}

let timerInterval;
function startTimer() {
  let time = parseInt(document.getElementById("timer-input").value) * 60;
  const timerDisplay = document.getElementById("timer");
  timerInterval = setInterval(() => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    timerDisplay.textContent = `Time Left: ${minutes}:${
