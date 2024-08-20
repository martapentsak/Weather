import { WeatherSlider } from "../../../components/Slider";
import { HOURLY_WEATHER_CONTAINER } from "../../../constants/textValues";
import { nowHours } from "../../../constants/time";
import { useWeather } from "../../../context/weather";
import { todayDate } from "../../../helpers/dayFornat";
import { hourlyWeatherIconIdentify } from "../../../helpers/indentifyIcon";
import { HourlyForecast } from "../../../types";

type Props = {
  weatherInfo: HourlyForecast;
};

export const MobileWeeklyWeatherComponent = ({ weatherInfo }: Props) => {
  const { todayWeatherInfo } = useWeather();
  const formatedDayOfWeek = new Date(weatherInfo.date)
    .toDateString()
    .slice(0, 3);
  const nowHour = weatherInfo.time?.slice(0, 2).includes(`${nowHours}`);
  const dayOfWeek =
    todayDate === formatedDayOfWeek
      ? HOURLY_WEATHER_CONTAINER.today
      : formatedDayOfWeek;
  const currentDate = new Date(weatherInfo.date).toLocaleString().slice(0, 5);
  const image = hourlyWeatherIconIdentify(weatherInfo, todayWeatherInfo.sunriseHour, todayWeatherInfo.sunsetHour);



  const temp =
    nowHour || todayDate === formatedDayOfWeek
      ? todayWeatherInfo?.temp
      : weatherInfo?.temp;

  return (
    <div className="mobile-weekly-weather-card">
      {weatherInfo.date ? (
        <h4 className="weather-card-header-day">{dayOfWeek}</h4>
      ) : null}
      <img className="weather-icon" src={image} />
      <div className="mobile-weekly-temp-section">
        <p className="min-temp">{weatherInfo.minTemp}°</p>
        <WeatherSlider value={temp ? temp : 0} max={40} />
        <p className="max-temp">{weatherInfo.maxTemp}°</p>
      </div>
    </div>
  );
};
