import { WeatherInfoContainer } from "../WeatherInfoContainer";
import { WeatherCardsContainer } from "../WeatherCardsContainer";

import { useWeather } from "../../context/weather";
import { useWindow } from "../../context/window";
import { MOBILE_WIDTH } from "../../constants/window";

export const WeatherForecastContainer = () => {
  const { HOURLY_WEEKLY_FORECAST, WIND_UVINDEX_SECTIONS } = useWeather();
  const { windowWidth } = useWindow();

  return (
    <div
      className={
        windowWidth > MOBILE_WIDTH
          ? "hourly-weekly-forecast-container"
          : "mobile-hourly-weekly-forecast-container"
      }
    >
      {HOURLY_WEEKLY_FORECAST.map((element, index) => (
        <WeatherCardsContainer element={element} key={index} />
      ))}
      <div className="today-weather-more-info-section">
        {WIND_UVINDEX_SECTIONS.map(({ name, icon, component }, index) => (
          <WeatherInfoContainer
            name={name}
            icon={icon}
            component={component}
            key={index}
          />
        ))}
      </div>
    </div>
  );
};
