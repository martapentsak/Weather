import axios from "axios";
import { Location } from "../../types";

export const getTodayWeather = async (location: Location) => {


  try {
    const response = await axios.request(config).then((response) => response.data.data.currentConditions)
   

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
