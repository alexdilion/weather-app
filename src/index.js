import "./style/index.css";

const WEATHER_URL =
    "http://api.weatherapi.com/v1/forecast.json?key=dfe8fba030ff459b8f3141617230708&days=3";

function processWeatherData(data) {
    const { forecast, location } = data;

    const locationData = {
        name: location.name,
        country: location.country,
    };

    const forecastData = forecast.forecastday.map((forecastDay) => ({
        date: forecastDay.date,
        weather: forecastDay.day.condition.text,
        weatherImage: forecastDay.day.condition.icon,
        maxTemp: forecastDay.day.maxtemp_c,
        minTemp: forecastDay.day.mintemp_c,
        avgTemp: forecastDay.day.avgtemp_c,
        rainChance: forecastDay.day.daily_chance_of_rain,
    }));

    return { locationData, forecastData };
}

async function fetchWeather(location) {
    const requestURL = `${WEATHER_URL}&q=${location}`;
    const response = await fetch(requestURL, { mode: "cors" });
    const data = await response.json();

    return data;
}

fetchWeather("dublin");
