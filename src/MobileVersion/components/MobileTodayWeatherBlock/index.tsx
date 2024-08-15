


import { LocationSelector } from "../../../components/LocationSelector";
import { WeatherCard } from "../../../components/WeatherCard";
import { WeatherForecastContainer } from "../../../components/WeatherForecastContainer";
import { WeatherInfoContainer } from "../../../components/WeatherInfoContainer";
import { useWeather } from "../../../context/weather";
import { weatherIconIdentify } from "../../../helpers/indentifyIcon";
import { MobileWeeklyWeatherComponent } from "../WeeklyWeatherComponent";

export const MobileWeatherBlock = () => {
  const { todayWeatherInfo, hourlyForecast, weeklyForecast, WIND_UVINDEX_SECTIONS, pairCategoryBlock} = useWeather();
  const imgsrc = weatherIconIdentify(todayWeatherInfo);

  return (
    <div className="mobile-today-weather-block">
      <LocationSelector />
      <div className="today-weather-block-info-container">
        <div className="today-weather-block-info-container-wrapper">
   
            <div className="today-weather-temperature">
              <h3 className="today-temperature">{todayWeatherInfo.temp}°</h3>
              <p className="day-status">{todayWeatherInfo.condition}</p>
            </div>
            {/* <div className="mobile-hourly-block">
              {hourlyForecast.map((element, index) => (
                <WeatherCard weatherInfo={element} key={index} />
              ))}
            </div> */}
       
            <WeatherForecastContainer/>
            {pairCategoryBlock()}
            
      
         
          </div>
          <div className="today-weather-category-block"></div>
        </div>
      </div>

  );
};
