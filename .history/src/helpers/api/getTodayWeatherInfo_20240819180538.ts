import axios from "axios";
import { Location } from "../../types";
import { nowHours } from "../../constants/time";
import { getConditionFromWeatherCode } from "../getConditionFromWeatherCode";

export const getTodayWeather = async (location: Location) => {


  try {
    const URL = `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&hourly=temperature_2m,relative_humidity_2m,weather_code,surface_pressure,visibility,wind_speed_10m,wind_gusts_10m,uv_index&daily=sunrise,sunset&x&forecast_days=1`
    const response = await axios.get(URL).then((response) => response.data)
    const weatherResponse = response.hourly

    const currentTimeWeather = weatherResponse.time.find((v : string) => v.includes(`${nowHours}:00`)) 
    const index = weatherResponse.time.indexOf(currentTimeWeather)
    console.log(response.daily.sunrise.slice(9),)

  
    return {
      temp: Math.round(weatherResponse.temperature_2m[index]) ,
      feelsLike:  Math.round(weatherResponse.temperature_2m[index]) + 1,
      humidity: weatherResponse.relative_humidity_2m[index],
      visibility: weatherResponse.visibility[index]/10000,
      condition: getConditionFromWeatherCode(weatherResponse.weather_code[index]),
      pressure: Math.round(weatherResponse.surface_pressure[index]),
      gust: Math.round(weatherResponse.wind_gusts_10m[index]),
      windSpeed: Math.round(weatherResponse.wind_speed_10m[index]),
      uvIndex:  Math.round(weatherResponse.uv_index[index]),
      sunrise: response.daily.sunrise.slice(11),
      sunset:  response.daily.sunrise.slice(11),
    };
  } catch (error) {
    console.error("getTodayWeatherInfo", error);
  }
};
