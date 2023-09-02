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

async function requestWeather(location) {
    const request = fetchWeather(location);
    const [data] = await delay(request, Math.random() * 500 + 500);

    if (data.error) {
        view.setState("error");
        return false;
    }

    return data;
}

async function onFormSubmit(event) {
    event.preventDefault();
    view.setState("loading");

    const data = await requestWeather(elements.locationQuery.value);

    if (data) {
        view.renderDailyForecasts(data);
    }
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

function onCurrentLocationClick(event) {
    if (!("geolocation" in navigator)) {
        alert("Geolocation is unavailable");
        return;
    }

    async function onPositionFetched(position) {
        const location = `${position.coords.latitude},${position.coords.longitude}`;
        const data = await requestWeather(location);

        if (data) {
            view.renderDailyForecasts(data);
        }
    }

    function onPositionFetchFailed() {
        view.setState("error");
    }

    view.setState("loading");
    navigator.geolocation.getCurrentPosition(onPositionFetched, onPositionFetchFailed);
}

elements.locationForm.addEventListener("submit", onFormSubmit);
elements.dailyForecasts.addEventListener("click", onCardClick);
elements.currentLocationButton.addEventListener("click", onCurrentLocationClick);
