
import { Location } from "./../../types/index";
import axios from "axios";



type Props = {
  humidity: number;
  low: number,
  high: number,
  description: string,
  dayName: string
  dayDate: {
    date: number;
    month: number;
    year: number;
   
  };
};

export const getWeeklyWeather = async (location: Location) => {
  const city = location.name;
 

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://Weather-API.proxy-production.allthingsdev.co/weather/getForecast/10daysForecast?latitude=49.83498008&longitude=24.02999548&unit=celsius',
    headers: { 
       'x-apihub-key': 'H9sKDEoGnzeXjkpHTLx9Y7soP1jyk4eGBWYLNVcadClH6vVBfy', 
       'x-apihub-host': 'Weather-API.allthingsdev.co', 
       'x-apihub-endpoint': 'a85e4cad-f8d7-4067-90de-a1f5a3897bb5'
    }
 };
 

  try {
    const URL = `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.}&hourly=uv_index&daily=weather_code,temperature_2m_max,apparent_temperature_max&timezone=GMT&forecast_hours=1`



    const response = await axios.request(config).then((response) => response.data.data.forecast.days)
  


    return response.map((weather : Props) => {
      const currentDay = new Date().getDate()
    const date =  weather.dayDate.date + "/" + weather.dayDate.month + "/" + weather.dayDate.year
   




  
      return {
        date,
        day: currentDay === weather.dayDate.date ? "Today" : weather.dayName,
        temp: weather.high,
        humidity: weather.humidity,
        // visibility: day.avgvis_km,
        condition: weather.description,
        minTemp: weather.low,
        maxTemp: weather.high,
      };
    });
  } catch (error) {
    console.error("getWeeklyWeather", error);
  }
};
