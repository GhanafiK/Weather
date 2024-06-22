getWeatherOf3Days("cairo");

navigator.geolocation.getCurrentPosition((position) => {
  getWeatherOf3Days(position.coords.latitude, position.coords.longitude);
});

const enterLocation = document.getElementById("enterLocation");
enterLocation.addEventListener("input", function () {
  if (enterLocation.value.length == 0) {
    navigator.geolocation.getCurrentPosition((position) => {
      getWeatherOf3Days(position.coords.latitude, position.coords.longitude);
    });
  } else if (enterLocation.value.length > 0) {
    getWeatherOf3Days(enterLocation.value);
  }
});

async function getWeatherOf3Days(...location) {
  let ourLoction = "";
  if (location.length === 1) {
    ourLoction = location[0];
  } else {
    ourLoction = location[0] + "," + location[1];
  }
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=01ed0cc98dbe40bda18184113241906&q=${ourLoction}&days=3`
    );
    const weatherOf3Days = await response.json();
    displayWeather(weatherOf3Days);
  } catch (error) {}
}

function displayWeather(weatherOf3Days) {
  function getTheNextDay(day) {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    day = day % 7;
    return daysOfWeek[day];
  }
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const monthName = month[today.getMonth()];
  const date = dd + monthName;

  const cards = document.getElementById("cards");
  let myday = "";
  myday = getTheNextDay(today.getDay());

  let content = ``;
  content += `
    <div class="col-lg-4">
    <div class="card card1 w-100" style="width: 18rem;" >
      <div class="card-header d-flex justify-content-between">
        <span>${myday}</span>
        <span>${date}</span>
      </div>
      <div class="card-body py-4">
        <h5 class="card-title">${weatherOf3Days.location.name}</h5>
        <span class="d-block card-degree">${weatherOf3Days.current.temp_c}°C</span>
        <img src=${weatherOf3Days.current.condition.icon} alt="" style="width: 90;">
        <span class="d-block my-3 text-info">${weatherOf3Days.current.condition.text}</span>
        <div class="icons d-flex gap-3">
          <div class="icon">
            <span><i class="fa-solid fa-umbrella"></i></span>
            <span>20%</span>
          </div>
          <div class="icon">
            <span><i class="fa-solid fa-wind"></i></span>
            <span>18km/h</span>
          </div>
          <div class="icon">
            <span><i class="fa-regular fa-compass"></i></span>
            <span>East</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  `;
  myday = getTheNextDay(today.getDay() + 1);
  content += `
    <div class="col-lg-4">
      <div class="card card2 w-100 h-100" style="width: 18rem;">
        <div class="card-header text-center">${myday}</div>
        <div class="card-body">
          <img src=${weatherOf3Days.forecast.forecastday[1].day.condition.icon} alt="" style="width: 48;" >
          <span class="d-block high-degree">${weatherOf3Days.forecast.forecastday[1].day.maxtemp_c}°C</span>
          <span class="d-block lower-degree">${weatherOf3Days.forecast.forecastday[1].day.mintemp_c}°</span>
          <span class="text-info d-block my-3">${weatherOf3Days.forecast.forecastday[1].day.condition.text}</span>
        </div>
      </div>
    </div>
  `;
  myday = getTheNextDay(today.getDay() + 2);
  content += `
    <div class="col-lg-4">
      <div class="card card3 w-100 h-100" style="width: 18rem;">
        <div class="card-header text-center">${myday}</div>
        <div class="card-body">
          <img src=${weatherOf3Days.forecast.forecastday[2].day.condition.icon}  alt="" style="width: 48;" >
          <span class="d-block high-degree">${weatherOf3Days.forecast.forecastday[2].day.maxtemp_c}°C</span>
          <span class="d-block lower-degree">${weatherOf3Days.forecast.forecastday[2].day.mintemp_c}°</span>
          <span class="text-info d-block my-3">${weatherOf3Days.forecast.forecastday[2].day.condition.text}</span>
        </div>
      </div>
    </div>
  `;
  cards.innerHTML = content;
}
