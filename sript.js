// Temperature functionality
let currentTempC = 3; // Starting temperature in Celsius
let isCelsius = true;

document.getElementById("temp-toggle").addEventListener("click", () => {
  isCelsius = !isCelsius;
  updateTemperatureDisplay();
});

document.getElementById("temp-increase").addEventListener("click", () => {
  if (isCelsius) {
    currentTempC++;
  } else {
    currentTempC = (currentTempC * 9/5) + 32;  // Convert to Fahrenheit
  }
  updateTemperatureDisplay();
});

document.getElementById("temp-decrease").addEventListener("click", () => {
  if (isCelsius) {
    currentTempC--;
  } else {
    currentTempC = (currentTempC * 9/5) + 32;  // Convert to Fahrenheit
  }
  updateTemperatureDisplay();
});

function updateTemperatureDisplay() {
  const tempDisplay = document.getElementById("temp-display");
  if (isCelsius) {
    tempDisplay.textContent = `Fridge: ${currentTempC}°C`;
  } else {
    let tempF = (currentTempC * 9/5) + 32;
    tempDisplay.textContent = `Fridge: ${tempF.toFixed(1)}°F`;
  }
}

// Music Player Functionality
let audio = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'); // Placeholder for music file
let isPlaying = false;

document.getElementById("play-music").addEventListener("click", () => {
  if (!isPlaying) {
    audio.play();
    isPlaying = true;
    document.getElementById("play-music").textContent = "Pause";
  } else {
    audio.pause();
    isPlaying = false;
    document.getElementById("play-music").textContent = "Play";
  }
});

document.getElementById("pause-music").addEventListener("click", () => {
  audio.pause();
  isPlaying = false;
  document.getElementById("play-music").textContent = "Play";
});

// Timer Alarm Sound
const alarmSound = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'); // Placeholder for timer alarm sound

// Shopping List Interaction
document.getElementById("add-item").addEventListener("click", () => {
  const newItem = document.getElementById("shopping-input").value;
  if (newItem) {
    const li = document.createElement("li");
    li.textContent = newItem;
    document.getElementById("shopping-items").appendChild(li);
    document.getElementById("shopping-input").value = '';
  }
});

// Update weather (This could later be replaced with a live API)
function updateWeather() {
  const weatherElement = document.getElementById("weather-display");
  weatherElement.textContent = `Sunny, 25°C`;  // Placeholder for actual weather
}

// Initialize and start timer for alarm
let timerInterval;
document.getElementById("start-timer").addEventListener("click", () => {
  const minutes = document.getElementById("timer-input").value;
  let seconds = minutes * 60;
  const timerDisplay = document.getElementById("timer-countdown");

  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    if (seconds > 0) {
      seconds--;
      let mins = Math.floor(seconds / 60);
      let secs = seconds % 60;
      timerDisplay.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    } else {
      clearInterval(timerInterval);
      alarmSound.play();
      alert("Time's up!");
    }
  }, 1000);
});

// Weather Button Functionality
weatherButton.addEventListener("click", updateWeather);

// Show and hide modules based on button clicks
onButton.addEventListener("click", () => {
  mainContent.style.display = "flex";
  showModule(null);  // Clear display except for clock
});

offButton.addEventListener("click", () => {
  mainContent.style.display = "none";  // Hide everything except the clock
});

temperatureButton.addEventListener("click", () => showModule(temperatureDiv));
fridgeButton.addEventListener("click", () => showModule(fridgeDiv));
tvButton.addEventListener("click", () => showModule(tvDiv));
browserButton.addEventListener("click", () => showModule(browserDiv));
weatherButton.addEventListener("click", () => showModule(weatherDiv));
timerButton.addEventListener("click", () => showModule(timerDiv));
shoppingListButton.addEventListener("click", () => showModule(shoppingListDiv));
musicPlayerButton.addEventListener("click", () => showModule(musicPlayerDiv));

// Function to show the selected module
function showModule(module) {
  const modules = [
    temperatureDiv, fridgeDiv, tvDiv, browserDiv, weatherDiv, timerDiv, shoppingListDiv, musicPlayerDiv
  ];
  modules.forEach(m => m.classList.add('hidden')); // Hide all modules
  if (module) module.classList.remove('hidden');  // Show the selected module
}

// Initialize Clock display
updateClock();
