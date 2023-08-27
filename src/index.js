import "./style/index.css";
import "./style/cards.css";

import fetchWeather from "./weather";
import elements from "./elements";
import * as view from "./view";

async function onFormSubmit(event) {
    event.preventDefault();
    const data = await fetchWeather(elements.locationQuery.value);
    
    view.renderDailyForecasts(data.forecastData);
}

elements.locationForm.addEventListener("submit", onFormSubmit);
