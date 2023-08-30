import "./style/index.css";
import "./style/cards.css";

import fetchWeather from "./weather";
import elements from "./elements";
import * as view from "./view";

let selectedCard = 0;

function onFormSubmit(event) {
    event.preventDefault();

    // toggle loading here...

    const request = fetchWeather(elements.locationQuery.value);
    const delay = new Promise((resolve) => {
        setTimeout(resolve, 1000);
    });

    Promise.all([request, delay]).then((values) => {
        const [data] = values;
        view.renderDailyForecasts(data.forecastData);
    });
}

function onCardClick(event) {
    const { target } = event;
    const card = target.closest(".card-big");

    if (!card) return;

    selectedCard = card.getAttribute("data-day-index");

    elements.dailyForecasts.childNodes.forEach((value) => {
        value.classList.remove("selected-card");
    });

    card.classList.add("selected-card");
}

elements.locationForm.addEventListener("submit", onFormSubmit);
elements.dailyForecasts.addEventListener("click", onCardClick);
