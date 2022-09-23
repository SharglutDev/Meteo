const container = document.querySelector(".container");
const input = document.querySelector("#city-input");
const fetchMeteoBtn = document.querySelector(".meteo-btn");

const result = document.querySelector("#result");
const city = document.querySelector(".city");
const weather = document.querySelector(".weather");
const weatherIcon = document.querySelector(".weatherImg");
const temp = document.querySelector(".tmp");
const error = document.querySelector(".error");

// ******* FETCH METEO ********

const fetchMeteo = async () => {
  let cityToFetch = input.value;

  const response = await fetch(
    `https://www.prevision-meteo.ch/services/json/${cityToFetch}`
  );
  const data = await response.json();
  return data;
};

// ******* CHANGE CITY ********

fetchMeteoBtn.addEventListener("click", () => {
  if (container.classList.contains("disabled")) {
    container.classList.toggle("disabled");
  }
  // fetchMeteo().then((data) => {
  //   if (data.errors) {
  //     error.classList.remove("disabled");
  //     result.classList.add("disabled");
  //   } else {
  //     error.classList.add("disabled");
  //     result.classList.remove("disabled");
  //     city.innerHTML = `${data.city_info.name}`;
  //     // fetchImg(data.current_condition.icon_big);
  //     weatherIcon.src = data.current_condition.icon_big;
  //     temp.innerHTML = `${data.current_condition.tmp}°C`;
  //   }
  // });
  const getMeteoData = async () => {
    const data = await fetchMeteo();
    if (data.errors) {
      error.classList.remove("disabled");
      result.classList.add("disabled");
    } else {
      error.classList.add("disabled");
      result.classList.remove("disabled");
      city.innerHTML = `${data.city_info.name}`;
      // fetchImg(data.current_condition.icon_big);
      weatherIcon.src = data.current_condition.icon_big;
      temp.innerHTML = `${data.current_condition.tmp}°C`;
    }
  };
  getMeteoData();
});

input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    fetchMeteoBtn.click();
  }
});
