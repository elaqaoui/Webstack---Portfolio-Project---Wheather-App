// Getting all the data elements
const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const currentWeatherItemsEl = document.getElementById('current-weather-items');
const timezone = document.getElementById('time-zone');
const countryEl = document.getElementById('country');
const weatherForecastEl = document.getElementById('weather-forecast');
const currentTempEl = document.getElementById('current-temp');

// Declaring array for months and days
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// Declaring API_KEY
const API_KEY = '6a6b218c91d74e0a825183217241609'; // Updated API Key

// Function to get weather data and access current location of user

setInterval(() => {
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const hoursIn12HrFormat = hour >= 13 ? hour % 12 : hour;
    const minutes = time.getMinutes();
    const ampm = hour >= 12 ? 'PM' : 'AM';

    timeEl.innerHTML = (hoursIn12HrFormat < 10 ? '0' + hoursIn12HrFormat : hoursIn12HrFormat) + ':' + (minutes < 10 ? '0' + minutes : minutes) + ' ' + `<span id="am-pm">${ampm}</span>`;

    dateEl.innerHTML = days[day] + ', ' + date + ' ' + months[month];

}, 1000);

// Getting user location
getWeatherData();
function getWeatherData() {
    navigator.geolocation.getCurrentPosition((success) => {
        let { latitude, longitude } = success.coords;

        fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${latitude},${longitude}&aqi=no`).then(res => res.json()).then(data => {
            console.log(data);
            showWeatherData(data);
        });
    });
}

// Updating current forecast of location
function showWeatherData(data) {
    let { humidity, pressure_mb, wind_kph, temp_c, condition } = data.current;
    let { name, country, tz_id } = data.location;

    timezone.innerHTML = tz_id;
    countryEl.innerHTML = `${name}, ${country}`;

    currentWeatherItemsEl.innerHTML =
        `<div class="weather-item">
            <div>Humidity</div>
            <div>${humidity}%</div>
        </div>
        <div class="weather-item">
            <div>Pressure</div>
            <div>${pressure_mb} mb</div>
        </div>
        <div class="weather-item">
            <div>Wind Speed</div>
            <div>${wind_kph} kph</div>
        </div>
        <div class="weather-item">
            <div>Condition</div>
            <div>${condition.text}</div>
        </div>
        <div class="weather-item">
            <div>Temperature</div>
            <div>${temp_c}&#176;C</div>
        </div>`;

    // Optional: If you need to display more details or add a forecast
    // You can use the `data.forecast` if the new API response includes forecast data
}
