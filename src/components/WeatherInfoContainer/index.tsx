import React, { ReactElement } from "react";

import { useWindow } from "../../context/window";

import { SvgIconComponent } from "@mui/icons-material";
import { MOBILE_WIDTH } from "../../constants/window";

type Props = {
  icon: SvgIconComponent;
  name: string;
  component: ReactElement;
};

export const WeatherInfoContainer = ({ icon, name, component }: Props) => {
  const { windowWidth } = useWindow();
  return (
    <div
      className={
        windowWidth > MOBILE_WIDTH
          ? "weather-info-container"
          : "mobile-weather-info-container"
      }
    >
      <div className="weather-info-container-header">
        <i className="weather-info-container-icon">
          {React.createElement(icon)}
        </i>
        <h3 className="weather-info-container-header-name">{name}</h3>
      </div>
      <div className="weather-info-component-section">{component}</div>
    </div>
  );
};
