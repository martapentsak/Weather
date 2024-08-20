import axios from "axios";
import { Location } from "../../types";
import { nowHours } from "../../constants/time";
import { getConditionFromWeatherCode } from "../getConditionFromWeatherCode";

export const getTodayWeather = async (location: Location) => {


  try {
    const URL = `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&hourly=temperature_2m,relative_humidity_2m,weather_code,surface_pressure,visibility,wind_speed_10m,wind_gusts_10m,uv_index&daily=sunrise,sunset&x&forecast_days=1`
    const response = await axios.get(URL).then((response) => response.data)
    const weatherResponse = response.hourly
    console.log(response)

    const currentTimeWeather = weatherResponse.time.find((v : string) => v.includes(`${nowHours}:00`)) 
    const index = response.time.indexOf(currentTimeWeather)

  
    return {
      temp: Math.round(response.temperature_2m[index]) ,
      feelsLike:  Math.round(response.temperature_2m[index]) + 1,
      humidity: response.relative_humidity_2m[index],
      visibility: response.visibility[index]/10000,
      condition: getConditionFromWeatherCode(response.weather_code[index]),
      pressure: Math.round(response.surface_pressure[index]),
      gust: Math.round(response.wind_gusts_10m[index]),
      windSpeed: Math.round(response.wind_speed_10m[index]),
      uvIndex:  Math.round(response.uv_index[index]),
      sunrise: 
      sunset: 
    };
  } catch (error) {
    console.error("getTodayWeatherInfo", error);
  }
};
