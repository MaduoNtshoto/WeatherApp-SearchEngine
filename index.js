let now = new Date();
function formatDate(date) {
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let month = [
    "January",
    "Febuary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let currentMonth = month[date.getMonth()];
  let day = days[dayIndex];

  return `${day}, ${currentMonth} ${hours}:${minutes}`;
}
let currentDate = document.querySelector("#time");
let dateElement = new Date();
currentDate.innerHTML = formatDate(dateElement);

function showTemperature(response) {
  let searchCities = document.querySelector("#city");
  searchCities.innerHTML = response.data.name;
  let clouds = document.querySelector("#cloud-condition");
  let cloudy = response.data.weather[0].description;
  clouds.innerHTML = `${cloudy}`;
  let temp = document.querySelector("#temperature");
  let temperature = Math.round(response.data.main.temp);
  temp.innerHTML = `${temperature}`;
  let humidity = document.querySelector("#humidity");
  let humid = response.data.main.humidity;
  humidity.innerHTML = `${humid}%`;
  let windSpeed = document.querySelector("#wind");
  let wind = Math.round(response.data.wind.speed);
  windSpeed.innerHTML = `Wind:${wind}km/h`;
}

let apiKey = "215576bab28022db35e6e64f040e1b56";
let units = "metric";

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  searchCity(searchInput.value);
}

function searchCity(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(`${apiUrl}`).then(showTemperature);
}
let searchBtn = document.querySelector("#search-button");
searchBtn.addEventListener("click", search);

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(`${apiUrl}`).then(showTemperature);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}
let currentButton = document.querySelector("#current-location");
currentButton.addEventListener("click", getCurrentPosition);
