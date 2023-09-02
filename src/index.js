import "./style/index.css";
import "./style/cards.css";

import fetchWeather from "./weather";
import elements from "./elements";
import * as view from "./view";

let selectedCard = 0;

function delay(promise, time) {
    const delayPromise = new Promise((resolve) => {
        setTimeout(resolve, time);
    });

    return Promise.all([promise, delayPromise]);
}

async function onFormSubmit(event) {
    event.preventDefault();
    elements.main.setAttribute("data-state", "loading");
    view.updateVisibility();

    const request = fetchWeather(elements.locationQuery.value);
    const [data] = await delay(request, 1500);

    if (data.error) {
        elements.main.setAttribute("data-state", "error");
        view.updateVisibility();
        return;
    }

    view.renderDailyForecasts(data);
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
