import { SvgIconComponent } from "@mui/icons-material";

export type TodayWeather = {
  temp: number | null;
  feelsLike: number | null;
  humidity: number | null;
  visibility: number | null;
  condition: string | undefined;
  pressure: number | null;
  uvIndex: number | null;
  gust: number | null;
  windSpeed: number | null;
  sunriseHour: string;
  sunriseHour: string
  };

  export type Location = {
    latitude: number | null;
    longitude: number | null;
    name: string;
    country: string;
    state: string

  };


  export type Coordinates = {
    latitude: number | null;
    longitude: number | null;
  }

  export type HourlyForecast = {
    time: string | null,
    temp: number | null,
    date: string,
    day: string,
    feelsLike: number | null,
    humidity: number | null,
    pressure: number | null;
    condition: string | null,
    visibility: number | null;
    maxTemp: number | null;
    minTemp: number | null;
  }

  export type WeeklyForecast = {
    temp: number | null,
    date: Date,
    humidity: number | null,
    pressure: number | null;
    condition: string | null,
    visibility: number | null;
  }


  export type Forecast = {
    time: string | number; // Adjust this based on your data structure
    temp: number | null;
    date: Date,
    feelsLike: number | null;
    humidity: number | null;
    visibility: number | null;
    pressure: number | null;
    condition: string;
};



  
