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

// eslint-disable-next-line import/prefer-default-export
export function renderDailyForecasts(forecastData) {
    const { dailyForecasts, main } = elements;

    main.setAttribute("data-state", "displaying");
    dailyForecasts.innerHTML = "";

    forecastData.forEach((cardData, index) => {
        const card = createDailyForecast(cardData, index);

        if (index === 0) {
            card.classList.add("selected-card");
        }

        dailyForecasts.appendChild(card);
    });
}
