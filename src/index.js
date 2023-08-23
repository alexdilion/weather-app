import "./style/index.css";
import "./style/cards.css";

import fetchWeather from "./weather";
import elements from "./elements";

async function onFormSubmit(event) {
    event.preventDefault();
    const data = await fetchWeather(elements.locationQuery.value);
    console.log(data)
}

elements.locationForm.addEventListener("submit", onFormSubmit);
