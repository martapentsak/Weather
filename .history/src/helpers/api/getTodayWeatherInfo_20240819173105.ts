import axios from "axios";
import { Location } from "../../types";
import { nowHours } from "../../constants/time";

export const getTodayWeather = async (location: Location) => {


  try {
    const URL = `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&hourly=temperature_2m,relative_humidity_2m,weather_code,surface_pressure,visibility,wind_speed_10m,wind_gusts_10m,uv_index&forecast_days=1`
    const response = await axios.get(URL).then((response) => response.data.hourly)

    const currentTimeWeather = response.time.find((v : string) => v.includes(`${nowHours}:00`)) 
    const index = response.time.indexOf(currentTimeWeather)
   

   

    return {
      temp: Math.round(response.temperature_2m[index]) ,
      feelsLike:  Math.round(response.temperature_2m[index]) + 1,
      humidity: response.relative_humidity_2m[index],
      visibility: response.visibility,
      condition: response.description,
      pressure: Math.round(response.surface_pressure[index]),
      gust: response.wind.slice(3, 5),
      windSpeed: response.wind.slice(0,3),
      uvIndex: response.uv_index
    };
  } catch (error) {
    console.error("getTodayWeatherInfo", error);
  }
};
