import elements from "./elements";

function createDailyForecast(cardData, index) {
    const card = document.createElement("div");
    card.classList.add("card-big", "fancy-border");
    card.setAttribute("data-day-index", index);

    card.innerHTML = `
    <h1 class="card-day">${cardData.day}</h1>
    <div class="card-image-wrapper">
        <img src="${cardData.weatherIcon}" alt="${cardData.weather}" class="card-weather-icon" />
    </div>
    <div class="card-info">
        <p>
            Max: 
            <span class="card-max-temperature">${cardData.maxTemp}°C</span>
        </p>
        <p>
            Average: 
            <span class="card-avg-temperature">${cardData.avgTemp}°C</span>
        </p>
        <p>
            Min: 
            <span class="card-min-temperature">${cardData.minTemp}°C</span>
        </p>
        <p>
            Rain chance:
            <span class="card-rain-chance">${cardData.rainChance}%</span>
        </p>
    </div>
    `;

    return card;
}

export default function renderDailyForecasts(forecastData) {
    const { dailyForecasts, main } = elements;
    
    main.setAttribute("data-empty", "false");
    dailyForecasts.innerHTML = "";

    forecastData.forEach((cardData, index) => {
        const card = createDailyForecast(cardData, index);

        dailyForecasts.appendChild(card);
    });
}
