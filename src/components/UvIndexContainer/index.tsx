import { WeatherSlider } from "../Slider";

import { UV_INDEX_ADVISE } from "../../constants/textValues";

import { useWeather } from "../../context/weather";
import { useWindow } from "../../context/window";

import { indentifyUvIndex } from "../../helpers/identifyUvIndexStatus";
import { MOBILE_WIDTH } from "../../constants/window";

export const UvIndexSection = () => {
  const { todayWeatherInfo } = useWeather();
  const { windowWidth } = useWindow();

  const index = todayWeatherInfo?.uvIndex ?? 0;

  return (
    <div
      className={
        windowWidth > MOBILE_WIDTH
          ? "uv-index-info-container"
          : "mobile-uv-index-info-container"
      }
    >
      <h2 className="uv-index-value">{index}</h2>
      <span className="uv-index-status">{indentifyUvIndex(index)}</span>
      <div className="uv-slider-section">
        <WeatherSlider value={index} max={11} />
      </div>
      <span className="uv-index-advice">{UV_INDEX_ADVISE}</span>
    </div>
  );
};
