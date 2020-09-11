(function () {
  const searchForm = document.querySelector(".search-location");
  const cityValue = document.querySelector(".search-location input");
  const cityName = document.querySelector(".city-name p");
  const cardBody = document.querySelector(".card-body");

  const convertToCelcius = (kelvin) => {
    celcius = Math.round(kelvin - 273.15);
    return celcius;
  };

  updateWeatherApp = (city) => {
    cityName.textContent = city.name;
    cardBody.innerHTML = `
          <div class="card-mid row">
            <div class="col-8 text-center temp">
              <span>${convertToCelcius(city.main.temp)}&deg;C</span>
            </div>
            <div class="col-4 condition-temp">
              <p class="condition">${city.weather[0].description}</p>
              <p class="high">${convertToCelcius(city.main.temp_max)}&deg;C</p>
              <p class="low">${convertToCelcius(city.main.temp_min)}&deg;C</p>
            </div>
          </div>
          <div class="icon-container shadow mx-auto">
            <img src="" alt="" />
          </div>
          <div class="card-bottom px-5 py-4 row">
            <div class="col text-center">
              <p>${convertToCelcius(city.main.feels_like)}&deg;C</p>
              <span>Feels like</span>
            </div>
            <div class="col text-center">
              <p>${city.main.humidity}%</p>
              <span>Humidity</span>
            </div>
          </div>
    `;
  };

  const cachedCity = JSON.parse(localStorage.getItem("city"));

  if (cachedCity) updateWeatherApp(cachedCity);

  // add an event listener
  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const citySearched = cityValue.value.trim();
    searchForm.reset();

    requestCity(citySearched)
      .then((data) => {
        localStorage.setItem("city", JSON.stringify(data));
        updateWeatherApp(data);
      })
      .catch((error) => {});
  });
})();

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/sw.js")
    .then((registration) => {})
    .catch((error) => {
      console.log(error);
    });
}
