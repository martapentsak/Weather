import { MOBILE_WIDTH } from "../../constants/window";
import { useWeather } from "../../context/weather";
import { useWindow } from "../../context/window";

export const WindInfoContainer = () => {
  const { WIND_INFO } = useWeather();
  const { windowWidth } = useWindow();
  return (
    <div
      className={
        windowWidth > MOBILE_WIDTH
          ? "wind-info-container"
          : "mobile-wind-info-container"
      }
    >
      {WIND_INFO.map(({ value, measurement, category }, index) => (
        <div className="wind-category-element" key={index}>
          <h2 className="wind-value">{value}</h2>
          <div className="wind-category-info">
            <span className="measurement">{measurement}</span>
            <span className="category">{category}</span>
          </div>
        </div>
      ))}
    </div>
  );
};
