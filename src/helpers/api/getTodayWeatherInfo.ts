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
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `https://Weather-API.proxy-production.allthingsdev.co/weather/getForecast?latitude=${location.latitude}&longitude=${location.longitude}&unit=celsius`,
    headers: { 
       'accept': '*/*', 
       'x-apihub-key': 'H9sKDEoGnzeXjkpHTLx9Y7soP1jyk4eGBWYLNVcadClH6vVBfy', 
       'x-apihub-host': 'Weather-API.allthingsdev.co', 
       'x-apihub-endpoint': 'f5ba59cd-7870-46b6-8f91-3053fcd66349'
    }
 };
 
 

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
