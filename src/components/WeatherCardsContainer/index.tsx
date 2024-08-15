import React from "react";

import { WeatherCard } from "../WeatherCard";

import { HourlyForecast } from "../../types";

import { useWindow } from "../../context/window";

import { SvgIconComponent } from "@mui/icons-material";
import { MOBILE_WIDTH } from "../../constants/window";

type ForecastArray = {
  icon: SvgIconComponent;
  title: string;
  array: HourlyForecast[];
};

type Props = {
  element: ForecastArray;
};

export const WeatherCardsContainer = ({ element }: Props) => {
  const { windowWidth } = useWindow();
  return (
    <div
      className={
        windowWidth > MOBILE_WIDTH
          ? "weather-forecast-container"
          : "mobile-weather-forecast-container"
      }
    >
      <div className="weather-forecast-container-wrapper">
        <div className="weather-forecast-container-header">
          <i className="weather-forecast-container-title-icon">
            {React.createElement(element.icon)}
          </i>
          <h3 className="weather-forecast-container-title">{element.title}</h3>
        </div>
        <div className="weather-forecast-temperature-container">
          {element.array.map((element, index) => (
            <WeatherCard weatherInfo={element} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};
