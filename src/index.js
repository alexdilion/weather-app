import "./style/index.css";

const WEATHER_URL =
    "http://api.weatherapi.com/v1/forecast.json?key=dfe8fba030ff459b8f3141617230708&days=3";


async function fetchWeather(location) {
    const requestURL = `${WEATHER_URL}&q=${location}`;
    const response = await fetch(requestURL, { mode: "cors" });
    const data = await response.json();

    return data;
}

fetchWeather("dublin");
