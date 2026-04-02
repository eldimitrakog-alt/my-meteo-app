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
  let city = response.data.city;
  let temperature = Math.round(response.data.temperature.current);
  let description = response.data.condition.description;
  let humidity = response.data.temperature.humidity;
  let wind = Math.round(response.data.wind.speed);
  let icon = response.data.condition.icon_url;
  let localTime = new Date(response.data.time * 1000);

  document.querySelector("#current-city").innerHTML = city;
  document.querySelector(".current-temperature-value").innerHTML = temperature;
  document.querySelector("#current-date").innerHTML = `
    ${formatDate(localTime)}, ${description} <br />
    Humidity: <strong>${humidity}%</strong>, 
    Wind: <strong>${wind} km/h</strong>
  `;
  document.querySelector(".current-temperature-icon").innerHTML = `
    <img src="${icon}" alt="${description}" class="weather-icon" />
  `;
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastHtml = "";

  forecast.forEach(function (day, index) {
    if (index > 0 && index < 6) {
      let date = new Date(day.time * 1000);
      let dayName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][
        date.getUTCDay()
      ];
      let maxTemp = Math.round(day.temperature.maximum);
      let minTemp = Math.round(day.temperature.minimum);
      let icon = day.condition.icon_url;
      let description = day.condition.description;

      forecastHtml += `
        <div class="weather-forecast-day">
          <div class="weather-forecast-date">${dayName}</div>
          <div class="weather-forecast-icon">
            <img src="${icon}" alt="${description}" class="weather-forecast-img" />
          </div>
          <div class="weather-forecast-temperatures">
            <div class="weather-forecast-temperature"><strong>${maxTemp}º</strong></div>
            <div class="weather-forecast-temperature">${minTemp}º</div>
          </div>
        </div>
      `;
    }
  });

  document.querySelector("#forecast").innerHTML = forecastHtml;
}

function getForecast(city) {
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
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
  getForecast(city);
}

document.querySelector("#search-form").addEventListener("submit", search);

window.addEventListener("load", function () {
  searchCity("Berlin");
  getForecast("Berlin");
});
