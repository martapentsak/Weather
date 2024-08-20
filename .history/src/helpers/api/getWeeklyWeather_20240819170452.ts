
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
  try {
    const URL = `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&hourly=uv_index&daily=weather_code,temperature_2m_max,apparent_temperature_max&timezone=GMT&forecast_hours=1`



    const response = await axios.get(URL).then((response) => response.data.daily)
    console.log(response)
  


    return response.time.map((values : string, index: number) => {
      const dateFormat = new Date(values).toLocaleDateString()
      const dayFormat = new Date(values).toDateString().slice(0,3)
      console.log(dayFormat)
  
      return {
        date : dateFormat,
        day: dayFormat,
        temp: Math.round(response.temperature_2m_max[index]),
        condition: get response.weather_code[index]
      };
    });
  } catch (error) {
    console.error("getWeeklyWeather", error);
  }
};
