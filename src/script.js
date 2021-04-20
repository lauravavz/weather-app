let now = new Date();
let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
];

let day = days[now.getDay()];

let hour = now.getHours();
let minutes = now.getMinutes();

let h3 = document.querySelector("h3");

h3.innerHTML = `${day} ${hour}:${minutes}`;


function displayWeatherCondition(response) {
  document.querySelector("#current-city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  )+"°C";
  document.querySelector("#weather-condition").innerHTML =
    response.data.weather[0].main;
}

function searchCity(city) {
  let apiKey = "c9b707c9a800bc82a565bfc394bcf972";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "c9b707c9a800bc82a565bfc394bcf972";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${
    position.coords.latitude
  }&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}


let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let currentTemperatureButton = document.querySelector("#current-temperature-button");
currentTemperatureButton.addEventListener("click", getCurrentLocation);

searchCity("Paris");