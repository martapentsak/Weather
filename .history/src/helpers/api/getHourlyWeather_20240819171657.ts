import axios from "axios";

import { Location } from "./../../types/index";
import { formatTimestampToTime } from "../formatTimestampToTime";
import { otherDay, today } from "../dayFornat";
import { nowHours } from "../../constants/time";

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
    const URL = `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&hourly=temperature_2m,relative_humidity_2m,weather_code,surface_pressure,visibility,wind_speed_10m,wind_gusts_10m,uv_index&forecast_days=3`
    const response = await axios.get(URL).then(response => response.data.hourly)
    const timeArray = response.time.slice(nowHours, 25 + nowHours)
    console.log(timeArray)



    return response.time.map((values : string, index: number) => {
      const dateFormat = new Date(values).toLocaleDateString()
      const dayFormat = new Date(values).toDateString().slice(0,3)
      console.log(dayFormat)
  
      return {
        date : dateFormat,
        day: dayFormat,
        temp: Math.round(response.temperature_2m_max[index]),
        condition: getConditionFromWeatherCode(response.weather_code[index]) 
      };
    });

    const hourlyWeatherForecast =  timeArray.map((index: number, value: string) => {
      console.log(value[index])
      return {
        time: value.slice(10)

      }

      
    })
    
    // const arrayResponse = response.data.forecast.forecastday[0].hour;
    // const nextDayResponse = response.data.forecast.forecastday[1].hour;
    // const timeArray = arrayResponse.filter(
    //   (v: any) => v.time_epoch >= oneHourLess
    // );
    // const nextDayWeather = nextDayResponse.slice(0, 24 - timeArray.length);
    // const hourlyArray =
    //   timeArray.length === 24 ? timeArray : timeArray.concat(nextDayWeather);
    // return hourlyArray.map(
    //   ({
    //     time_epoch,
    //     temp_c,
    //     humidity,
    //     feelslike_c,
    //     pressure_mb,
    //     vis_km,
    //     condition,
    //   }: Props) => {
    //     const hourTime = formatTimestampToTime(time_epoch);
    //     return {
    //       temp: Math.round(temp_c),
    //       time: hourTime,
    //       feelsLike: feelslike_c,
    //       humidity,
    //       pressure: pressure_mb,
    //       visibility: vis_km,
    //       condition: condition.text,
    //     };
    //   }
    // );
  } catch (error) {
    console.error("getHourlyWeather", error);
  }
};
