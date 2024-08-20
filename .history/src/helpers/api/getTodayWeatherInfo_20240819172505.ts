import axios from "axios";
import { Location } from "../../types";

export const getTodayWeather = async (location: Location) => {

  // const options = {
  //   method: "GET",
  //   url: "https://weatherapi-com.p.rapidapi.com/current.json",
  //   params: { q: `${location.latitude},${location.longitude}` },
  //   headers: {
  //     "x-rapidapi-key": "e226d753c6msh4723930b6ec4cacp13a7bajsn8e19398c8952",
  //     "x-rapidapi-host": "weatherapi-com.p.rapidapi.com",
  //   },
  // };
 
 

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
