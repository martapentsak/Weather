import { nowHours } from "../../constants/time";
import { HOURLY_WEATHER_CONTAINER } from "../../constants/textValues";

import { useWeather } from "../../context/weather";
import { useWindow } from "../../context/window";

import { todayDate } from "../../helpers/dayFornat";
import { hourlyWeatherIconIdentify } from "../../helpers/indentifyIcon";

import { HourlyForecast } from "../../types";
import { MOBILE_WIDTH } from "../../constants/window";


type Props = {
  weatherInfo: HourlyForecast;
};

export const WeatherCard = ({ weatherInfo }: Props) => {
  const { todayWeatherInfo, weeklyForecast, hourlyForecast} = useWeather();
  const { windowWidth } = useWindow();


  const firstElement = weeklyForecast.indexOf(weatherInfo) === 0 

  const nowHour = weatherInfo.time?.slice(0, 2).includes(`${nowHours}`) && hourlyForecast.indexOf(weatherInfo) === 0

  const nowTime = nowHour ? HOURLY_WEATHER_CONTAINER.now : weatherInfo.time;


  const image = hourlyWeatherIconIdentify(weatherInfo, todayWeatherInfo.);



  return (
    <div className={windowWidth > MOBILE_WIDTH ? "weather-card" : "mobile-weather-card"}>
      {weatherInfo.time ? (
        <h3 className="weather-card-header">{nowTime}</h3>
      ) : null}
      {weatherInfo.day ? (
        <h4 className="weather-card-header-day">{firstElement? "Today" : weatherInfo.day}</h4>
      ) : null}
      {weatherInfo.date ? (
        <h4 className="weather-card-header-date">{weatherInfo.date}</h4>
      ) : null}
      <span className="weather-temp">
        {firstElement ? todayWeatherInfo.temp : weatherInfo.temp}
        °
      </span>
      <img className="weather-icon" src={image} />
    </div>
  );
};
