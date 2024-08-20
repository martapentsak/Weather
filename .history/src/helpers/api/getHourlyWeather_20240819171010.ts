import axios from "axios";

import { Location } from "./../../types/index";
import { formatTimestampToTime } from "../formatTimestampToTime";
import { otherDay, today } from "../dayFornat";

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
    const URL = `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}13.41&hourly=temperature_2m,relative_humidity_2m,weather_code,surface_pressure,visibility,wind_speed_10m,wind_gusts_10m,uv_index&forecast_days=3`
    const response = await axios.request(options);
    const arrayResponse = response.data.forecast.forecastday[0].hour;
    const nextDayResponse = response.data.forecast.forecastday[1].hour;
    const timeArray = arrayResponse.filter(
      (v: any) => v.time_epoch >= oneHourLess
    );
    const nextDayWeather = nextDayResponse.slice(0, 24 - timeArray.length);
    const hourlyArray =
      timeArray.length === 24 ? timeArray : timeArray.concat(nextDayWeather);
    return hourlyArray.map(
      ({
        time_epoch,
        temp_c,
        humidity,
        feelslike_c,
        pressure_mb,
        vis_km,
        condition,
      }: Props) => {
        const hourTime = formatTimestampToTime(time_epoch);
        return {
          temp: Math.round(temp_c),
          time: hourTime,
          feelsLike: feelslike_c,
          humidity,
          pressure: pressure_mb,
          visibility: vis_km,
          condition: condition.text,
        };
      }
    );
  } catch (error) {
    console.error("getHourlyWeather", error);
  }
};
