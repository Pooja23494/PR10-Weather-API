const API_KEY = "6865a526b17dd123624596aa722836b0";

const searchBtn = document.getElementById("searchBtn");
const search = document.getElementById("search");

searchBtn.addEventListener("click", () => {
    let city = search.value.trim();
    if (city !== "") {
        getWeather(city);
        getForecast(city);
    }
});

async function getWeather(city) {
    let url =
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    let res = await fetch(url);
    let data = await res.json();

    document.querySelector(".city-name").innerText = data.name;
    document.querySelector(".temperature").innerText = `${Math.round(data.main.temp)}°C`;
    document.querySelector(".weather-type").innerText = data.weather[0].description;

    document.getElementById("weatherIcon").src =
        `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    document.getElementById("feelsLike").innerText = data.main.feels_like;
    document.getElementById("humidity").innerText = data.main.humidity;
    document.getElementById("wind").innerText = data.wind.speed;

    let now = new Date();
    document.querySelector(".date-time").innerText =
        now.toDateString() + " | " + now.toLocaleTimeString();
}

async function getForecast(city) {
    let url =
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`;

    let res = await fetch(url);
    let data = await res.json();

    let forecastDiv = document.getElementById("forecast");
    forecastDiv.innerHTML = "";

    let dailyData = data.list.filter(item => item.dt_txt.includes("12:00:00"));

    dailyData.forEach(day => {
        let card = document.createElement("div");
        card.classList.add("card");

        let date = new Date(day.dt * 1000).toLocaleDateString("en-US", { weekday: "long" });

        card.innerHTML = `
            <h4>${date}</h4>
            <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}.png">
            <h5>${Math.round(day.main.temp)}°C</h5>
            <p>${day.weather[0].description}</p>
        `;

        forecastDiv.appendChild(card);
    });
}

getWeather("Navsari");
getForecast("Navsari");
