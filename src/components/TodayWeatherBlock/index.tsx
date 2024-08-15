import { LocationSelector } from "../LocationSelector";
import { WeatherAnimationIcon } from "../WeatherAnimationIcon";

import { useWeather } from "../../context/weather";

import { weatherIconIdentify } from "../../helpers/indentifyIcon";

export const TodayWeatherBlock = () => {
  const { todayWeatherInfo, pairCategoryBlock } = useWeather();

  return (
    <div className="today-weather-block">
      <LocationSelector />
      <div className="today-weather-block-info-container">
        <div className="today-weather-block-info-container-wrapper">
          <div className="today-weather-temperature-info-block">
            <div className="today-weather-temperature">
              <h3 className="today-temperature">{todayWeatherInfo.temp}°</h3>
              <p className="day-status">{todayWeatherInfo.condition}</p>
            </div>
            <div className="today-temperature-animation">
              <WeatherAnimationIcon
                height={"100%"}
                width={"100%"}
                animation={weatherIconIdentify(todayWeatherInfo)}
              />
            </div>
          </div >
          <div className="pair-category-section">
          {pairCategoryBlock()}

          </div>
        </div>
      </div>
    </div>
  );
};
