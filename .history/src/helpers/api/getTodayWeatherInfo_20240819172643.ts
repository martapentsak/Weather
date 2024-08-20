import axios from "axios";
import { Location } from "../../types";
import { nowHours } from "../../constants/time";

export const getTodayWeather = async (location: Location) => {


  try {
    const URL = `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&hourly=temperature_2m,relative_humidity_2m,weather_code,surface_pressure,visibility,wind_speed_10m,wind_gusts_10m,uv_index&forecast_days=1`
    const response = await axios.get(URL).then((response) => response.data.hourly)

    const currentTimeWeather = response.time.find((v : string) => v.includes(`${nowHours}:00`)) 
    console.log(currentTimeWeather)
   

    return {
      temp: response.temperature,
      feelsLike: response.feelsLikeTemperature,
      humidity: response.humidity,
      visibility: response.visibility,
      condition: response.description,
      pressure: Math.round(response.barometricPressure),
      gust: response.wind.slice(3, 5),
      windSpeed: response.wind.slice(0,3),
    };
  } catch (error) {
    console.error("getTodayWeatherInfo", error);
  }
};
