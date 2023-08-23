import "./style/index.css";
import "./style/cards.css";

import fetchWeather from "./weather";
import elements from "./elements";

elements.locationForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = fetchWeather(elements.locationQuery.value);
});
