import { format } from "date-fns";

const WEATHER_URL =
    "http://api.weatherapi.com/v1/forecast.json?key=dfe8fba030ff459b8f3141617230708&days=3";

function processWeatherData(data) {
    const { forecast, location } = data;

    const locationData = {
        name: location.name,
        country: location.country,
    };

    const forecastData = forecast.forecastday.map((forecastDay) => ({
        date: new Date(forecastDay.date),
        day: format(new Date(forecastDay.date), "EEEE"),
        weather: forecastDay.day.condition.text,
        weatherIcon: forecastDay.day.condition.icon
            .replace("//", "https://")
            .replace("64x64", "128x128"),

        maxTemp: forecastDay.day.maxtemp_c,
        minTemp: forecastDay.day.mintemp_c,
        avgTemp: forecastDay.day.avgtemp_c,
        rainChance: forecastDay.day.daily_chance_of_rain,
    }));

    return { locationData, forecastData };
}

export default async function fetchWeather(location) {
    const requestURL = `${WEATHER_URL}&q=${location}`;
    const response = await fetch(requestURL, { mode: "cors" });
    const data = await response.json();

    return processWeatherData(data);
}