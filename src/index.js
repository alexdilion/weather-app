import "./style/index.css";
import "./style/cards.css";

import fetchWeather from "./weather";
import elements from "./elements";
import * as view from "./view";

let selectedCard = 0;

async function onFormSubmit(event) {
    event.preventDefault();
    const data = await fetchWeather(elements.locationQuery.value);

    view.renderDailyForecasts(data.forecastData);
}

function onCardClick(event) {
    const { target } = event;
    const card = target.closest(".card-big");

    if (!card) return;

    selectedCard = card.getAttribute("data-day-index");

    elements.dailyForecasts.childNodes.forEach(value => {
        value.classList.remove("selected-card")
    })

    card.classList.add("selected-card")
}

elements.locationForm.addEventListener("submit", onFormSubmit);
elements.dailyForecasts.addEventListener("click", onCardClick);
