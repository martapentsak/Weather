import { TodayWeatherBlock } from "../TodayWeatherBlock";
import { WeatherForecastContainer } from "../WeatherForecastContainer";
import { MobileWeatherBlock } from "../../MobileVersion/components/MobileTodayWeatherBlock";

import { MOBILE_WIDTH } from "../../constants/window";

import { useWindow } from "../../context/window";

export const HomePageContainer = () => {
  const { windowWidth } = useWindow();
  return (
    <div
      className={
        windowWidth > MOBILE_WIDTH
          ? "home-page-container"
          : "mobile-home-page-container"
      }
    >
      <div className="home-page-container-wrapper">
        {windowWidth > MOBILE_WIDTH ? (
          <TodayWeatherBlock />
        ) : (
          <MobileWeatherBlock />
        )}
        {windowWidth > MOBILE_WIDTH ? <WeatherForecastContainer /> : null}
      </div>
    </div>
  );
};
