import { MOBILE_WIDTH } from "../../constants/window";
import { useWeather } from "../../context/weather";
import { useWindow } from "../../context/window";

import { TodayWeather } from "../../types";

import { SvgIconComponent } from "@mui/icons-material";

type WeatherInfo = {
  icon: SvgIconComponent;
  category: string;
  value: (todayWeatherInfo : TodayWeather) => string, 
  desc: string
};

type Props = {
  todayInfo: WeatherInfo;
};

export const TodayWeatherInfoContainer = ({ todayInfo }: Props) => {
  const { icon: Icon, category, value, desc } = todayInfo;
  const {todayWeatherInfo} = useWeather()
  const {windowWidth} = useWindow()

  return (
    <div className={windowWidth > MOBILE_WIDTH ? "today-weather-info-container" : "mobile-today-weather-info-container"}>
      <div className="today-weather-info-container-wrapper">
        <div className="today-weather-info-container-header">
          <i>
            <Icon />
          </i>
          <h3 className="category">{category}</h3>
        </div>
        <div className="today-weather-info-value">
          <h3 className="category-value">{value(todayWeatherInfo)}</h3>
          <span className="weather-desc">{desc}</span>
        </div>
      </div>
    </div>
  );
};
