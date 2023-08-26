import "./style/index.css";
import "./style/cards.css";

import fetchWeather from "./weather";
import elements from "./elements";
import view from "./view";

async function onFormSubmit(event) {
    event.preventDefault();
    const data = await fetchWeather(elements.locationQuery.value);
    console.log(data);
    view(data.forecastData);
}

elements.locationForm.addEventListener("submit", onFormSubmit);
