import axios from "axios";

import { Location } from "./../../types/index";
import { nowHours } from "../../constants/time";
import { getConditionFromWeatherCode } from "../getConditionFromWeatherCode";

type Props = {
  time_epoch: number;
  temp_c: number;
  humidity: number;
  feelslike_c: number;
  pressure_mb: number;
  vis_km: number;
  condition: { text: string };
};

export const getHourlyWeather = async (location: Location) => {
  try {
    const URL = `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&hourly=temperature_2m,weather_code&forecast_days=3`
    const response = await axios.get(URL).then(response => response.data.hourly)
    const timeArray = response.time.slice(nowHours, 25 + nowHours)
    return timeArray.map((value : string, index: number) => {  
      return {
            temp: Math.round(response.temperature_2m[index]),
            time: value.slice(11),
            condition: getConditionFromWeatherCode(response.weather_code[index]),
      };
    });
  } catch (error) {
    console.error("getHourlyWeather", error);
  }
};
