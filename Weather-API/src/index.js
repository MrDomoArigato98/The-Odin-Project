import "./reset.css";
import "./style.css";
import { Weather } from "./weatherObject";
import { getWeather, processJson } from "./processJson";
import gitImg from "./assets/git.png";

const locationInput = document.getElementById("input-location");

let currentDate = new Date().toJSON().slice(0, 10);
document.getElementById("current-date").innerHTML =
  "<b>Today's Date: </b>" + currentDate;

locationInput.addEventListener("keyup", async (event) => {
  if (event.key == "Enter") {
    const location = locationInput.value;
    const url =
      "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" +
      location +
      "?unitGroup=us&key=TK8J2K84WTDTJ2QTMZTJNHQPX&contentType=json";

    const weatherData = await getWeather(url);

    if (weatherData) {
      document.getElementById("error").innerHTML = "";
      const processedWeather = processJson(weatherData);
      displayWeather(processedWeather);
    } else {
      clearWeather();
      console.error("Failed to fetch weather. Check API or network.");
      document.getElementById("error").innerHTML =
        "<b>Error fetching weather data. Try again. Is your Location correct?</b>";
    }
  }
});

function displayWeather(locationWeather) {
  document.getElementById("address").innerHTML =
    "<b>Location: </b>" + locationWeather.address;
  document.getElementById("time").innerHTML =
    "<b>Time: </b>" + locationWeather.time;
  document.getElementById("temp").innerHTML =
    "<b>Temperature: </b>" + locationWeather.tempF + " °F";
  document.getElementById("feel").innerHTML =
    "<b>Feels like: </b>" + locationWeather.feelslikeF + " °F";
  document.getElementById("humidity").innerHTML =
    "<b>Humidity: </b>" + locationWeather.humidity + "%";
  document.getElementById("windspeed").innerHTML =
    "<b>Windspeed: </b>" + locationWeather.windspeed + " miles/h";
  document.getElementById("description").innerHTML =
    "<b>" + locationWeather.description + "</b>";
}

function clearWeather() {
  document.getElementById("address").innerHTML = "";
  document.getElementById("time").innerHTML = "";
  document.getElementById("temp").innerHTML = "";
  document.getElementById("feel").innerHTML = "";
  document.getElementById("humidity").innerHTML = "";
  document.getElementById("windspeed").innerHTML = "";
  document.getElementById("description").innerHTML = "";
}
