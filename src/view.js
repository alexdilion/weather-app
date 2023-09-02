import elements from "./elements";

function createDailyForecast(cardData, index) {
    const card = document.createElement("div");
    card.classList.add("card-big", "fancy-border");
    card.setAttribute("data-day-index", index);

    card.innerHTML = `
    <h1 class="card-header">${cardData.day}</h1>
    <div class="card-image-wrapper">
        <img src="${cardData.weatherIcon}" alt="${cardData.weather}" class="card-weather-icon" />
    </div>
    <div class="card-info">
        <table class="temp-table">
            <caption>Temperature °C</caption>
            <thead>
                <tr>
                    <th>Min</th>
                    <th>Avg</th>
                    <th>Max</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="card-temp-min">${cardData.minTemp}</td>
                    <td class="card-temp-avg">${cardData.avgTemp}</td>
                    <td class="card-temp-max">${cardData.maxTemp}</td>
                </tr>
            </tbody>
        </table>
        <p>
            Rain chance:
            <span class="card-rain-chance">${cardData.rainChance}%</span>
        </p>
    </div>
    `;

    return card;
}

export function updateVisibility() {
    const state = elements.main.getAttribute("data-state");

    elements.main
        .querySelectorAll(".visible-element")
        .forEach((element) => element.classList.replace("visible-element", "hidden-element"));

    switch (state) {
        case "empty":
            elements.placeholderScreen.classList.replace("hidden-element", "visible-element");
            break;
        case "loading":
            elements.loadingScreen.classList.replace("hidden-element", "visible-element");
            break;
        case "error":
            elements.errorScreen.classList.replace("hidden-element", "visible-element");
            break;
        case "displaying":
            elements.locationHeader.classList.replace("hidden-element", "visible-element");
            elements.forecastsWrapper.classList.replace("hidden-element", "visible-element");
            break;
        default:
            break;
    }
}

export function setState(state) {
    elements.main.setAttribute("data-state", state);
    updateVisibility();
}

export function renderDailyForecasts(data) {
    const { dailyForecasts, main, locationHeader } = elements;

    setState("displaying");
    dailyForecasts.innerHTML = "";
    locationHeader.textContent = `${data.locationData.name}, ${data.locationData.country}`;

    data.forecastData.forEach((cardData, index) => {
        const card = createDailyForecast(cardData, index);

        if (index === 0) {
            card.classList.add("selected-card");
        }

        dailyForecasts.appendChild(card);
    });
}
