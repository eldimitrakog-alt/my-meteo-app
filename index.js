let apiKey = "0t6ef4f887495d65a4537f2face0bo0b";

function formatDate(date) {
  let minutes = date.getUTCMinutes();
  let hours = date.getUTCHours();
  let day = date.getUTCDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return `${days[day]} ${hours}:${minutes}`;
}

function displayTemperature(response) {
  let temperature = Math.round(response.data.temperature.current);
  let city = response.data.city;
  let description = response.data.condition.description;
  let humidity = response.data.temperature.humidity;
  let wind = Math.round(response.data.wind.speed);
  let icon = response.data.condition.icon_url;

  let timestamp = response.data.time;
  let localTime = new Date(timestamp * 1000);

  document.querySelector("#current-city").innerHTML = city;
  document.querySelector(".current-temperature-value").innerHTML = temperature;

  document.querySelector("#current-date").innerHTML =
    `${formatDate(localTime)}, ${description} <br />
     Humidity: <strong>${humidity}%</strong>, 
     Wind: <strong>${wind} km/h</strong>`;

  document.querySelector(".current-temperature-icon").innerHTML =
    `<img src="${icon}" alt="${description}" class="weather-icon" />`;
}

function searchCity(city) {
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios
    .get(apiUrl)
    .then(displayTemperature)
    .catch(function () {
      alert("City not found. Please try again.");
    });
}

function search(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value.trim();
  searchCity(city);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

function loadDefaultCity() {
  searchCity("Berlin");
}

window.addEventListener("load", loadDefaultCity);
