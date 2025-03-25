import { Weather } from "./weatherObject";

const loaderContainer = document.querySelector(".loader");

const displayLoading = () => {
  loaderContainer.style.display = "block";
};
const hideLoading = () => {
  loaderContainer.style.display = "none";
};
async function getWeather(url) {
  try {
    displayLoading();
    const response = await fetch(url, { mode: "cors" });
    if (!response.ok) {
      hideLoading();
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }
    const data = await response.json();
    hideLoading();
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

const processJson = function processWeatherJsonResponse(jsonData) {
  const weather = new Weather(
    jsonData.resolvedAddress,
    jsonData.currentConditions.datetime,
    jsonData.currentConditions.temp,
    jsonData.currentConditions.feelslike,
    jsonData.currentConditions.humidity,
    jsonData.currentConditions.windspeed,
    jsonData.description
  );

  console.log(weather);
  return weather;
};

export { getWeather, processJson };
