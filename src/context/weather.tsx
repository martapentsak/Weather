import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
  ReactElement,
} from "react";

import axios from "axios";

import { UvIndexSection } from "../components/UvIndexContainer";
import { WindInfoContainer } from "../components/WindInfoContainer";
import { TodayWeatherInfoContainer } from "../components/TodayWeatherInfoContainer";


import {
  HOURLY_WEEKLY_FORECAST_TITLE,
  WIND_CATEGORY,
  WIND_MEASUREMENT,
  WIND_UVINDEX_SECTIONS_VALUES,
} from "../constants/textValues";
import { CITIES_API } from "../constants/api";
import { TODAY_WEATHER_INFO } from "../constants/weatherInfo";

import { sleep } from "../helpers/sleep";
import { getHourlyWeather } from "../helpers/api/getHourlyWeather";
import { getWeeklyWeather } from "../helpers/api/getWeeklyWeather";
import { getTodayWeather } from "../helpers/api/getTodayWeatherInfo";
import { getLocationFromCityName } from "../helpers/api/getLocationByCityName";


import { HourlyForecast, Location, TodayWeather } from "../types";

import StormIcon from "@mui/icons-material/Storm";
import { SvgIconComponent } from "@mui/icons-material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import ThermostatOutlinedIcon from "@mui/icons-material/ThermostatOutlined";
import { getCityFromCoordinates } from "../helpers/api/getCityFromCoordinates";
import { useModal } from "./modal";

import cities from "../cities.json"



type AllList = {
  cities: string[];
  country: string;
  iso2: string;
  iso3: string;
};

type ForecastArray = {
  icon: SvgIconComponent;
  title: string;
  array: HourlyForecast[];
};

type WindProps = {
  category: string;
  value: number | null;
  measurement: string;
};

type WindIndexProps = {
  icon: SvgIconComponent;
  name: string;
  component: ReactElement;
};

type ProviderValues = {
  location: Location;
  hourlyForecast: HourlyForecast[];
  weeklyForecast: HourlyForecast[];
  error: string;
  cities: string[];
  loading: boolean;
  todayWeatherInfo: TodayWeather;
  locationExist: boolean;
  HOURLY_WEEKLY_FORECAST: ForecastArray[];
  WIND_INFO: WindProps[];
  WIND_UVINDEX_SECTIONS: WindIndexProps[];
  pairCategoryBlock: () => JSX.Element[];
  handleGetLocationByIP: () => void;
  handleChangeSelectedCity: (e: any) => void;

};

export const WeatherContext = createContext({} as ProviderValues);

type Props = {
  children: ReactNode;
};

export const WeatherProvider = ({ children }: Props) => {
  const [location, setLocation] = useState<Location>({
    latitude: null,
    longitude: null,
    name: "",
    country: "Ukraine",
    state: "",
  });

  const [todayWeatherInfo, setTodayWeatherInfo] = useState<TodayWeather>({
    temp: null,
    feelsLike: null,
    humidity: null,
    visibility: null,
    condition: "",
    pressure: null,
    uvIndex: null,
    gust: null,
    windSpeed: null,
  });

  // const [cities, setCities] = useState<string[]>([]);

  const [hourlyForecast, setHourlyForecast] = useState<HourlyForecast[]>([]);

  const [weeklyForecast, setWeeklyForecast] = useState<HourlyForecast[]>([]);

  const [loading, setLoading] = useState<boolean>(false);


  const [inputValue, setInputValue] = useState<string>("");
  const [error, setError] = useState<string>("");

  const locationExist =
    location.latitude !== null && location.longitude !== null;

  const todayWeatherIsLoaded = Object.values(todayWeatherInfo).every(
    (v) => v !== null
  );

  const {handleOpenModal} = useModal()

  useEffect(() => {
    handleLocalStorageCheck();
    handleGetCitiesList();
    // if (todayWeatherInfo.temp) {
    //   weeklyForecast[0].temp = todayWeatherInfo.temp
    // }
 
    if (!location.latitude && !location.longitude) {
      handleOpenModal()
    }
  }, []);




  const today = new Date().toISOString().split("T")[0];

  const handleGetTodayWeather = async (location: Location) => {
    setLoading(true);
    await sleep(2000);
    try {
      const response = await getTodayWeather(location);
      if (response) {
        setTodayWeatherInfo((prev) => ({
          ...prev,
          temp: response.temp,
          feelsLike: response.feelsLike,
          humidity: response.humidity,
          visibility: response.visibility,
          condition: response.condition,
          pressure: response.pressure,
          uvIndex: 7,
          gust: response.gust,
          windSpeed: response.windSpeed,
        }));
      }
    } catch (error) {
      console.error("getTodayWeatherInfo", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGetHourlyWeather = async (location: Location) => {
    setLoading(true);
    await sleep(2000);
    try {
      if (location.latitude && location.longitude) {
        const response = await getHourlyWeather(location);
        setHourlyForecast(response);
      }
    } catch (error) {
      console.error("getHourlyWeather", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGetWeeklyWeather = async (location: Location) => {
    setLoading(true);
    await sleep(2000);
    try {
      if (location.latitude && location.longitude) {
        const response = await getWeeklyWeather(location);
        setWeeklyForecast(response);
      }
    } catch (error) {
      console.error("getHourlyWeather", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChangeSelectedCity = async (value: string) => {
    if (value !== null) {
    const currentCity = cities.find(v => value.includes(v.city))
      // handleGetTodayWeather(currentCity);
      const newLocation = {
        name: currentCity.city, 
        country: currentCity.country, 
        latitude: currentCity.lat, 
        longitude: currentCity.lng ,
        state: ""
      }
      setLocation((prev) => ({ ...prev, name: currentCity.city, country: currentCity.country, latitude: currentCity.lat, longitude: currentCity.lng }));
      handleSetToLocalStorage(newLocation);

    } else {
      setLocation((prev) => ({...prev, name: prev.name}))
    }
   
      // const coordinates = await getLocationFromCityName(value);
      // setLocation(coordinates);
      // handleGetHourlyWeather(coordinates)
      // handleGetWeeklyWeather(coordinates)
    
  };





  const handleGetCitiesList = async () => {
    const response = await axios.get(CITIES_API);
    const allList: AllList[] = response.data.data;
    const countryData = allList.find(
      (element: AllList) => element.country === "Ukraine"
    );
    // return setCities(countryData ? countryData.cities : []);
  };

  const handleGetLocationByIP = () => {
    setLoading(true);
    try {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          setLocation((prev) => {
            if (prev.longitude !== null && prev.latitude !== null) {
              handleFindCityByCoordinates(prev);
              // handleSetToLocalStorage(prev);
            }
            return {
              ...prev,
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            };
          });
        });
      } else {
        setError("Geolocation is not supported by this browser.");
      }
    } catch (err) {
      console.error("handleGetLocationByIP", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSetToLocalStorage = (coordinates: Location) => {
    localStorage.setItem("location", JSON.stringify(coordinates));
  };

  const handleLocalStorageCheck = () => {
    setLoading(true);
    const somethingExist = localStorage.getItem("location");
    const result = somethingExist ? JSON.parse(somethingExist) : null;
    if (result) {
      setLoading(false);
      // handleGetHourlyWeather(result);
      handleGetTodayWeather(result);
      handleGetWeeklyWeather(result);
      handleSetToLocalStorage(result);
      return setLocation(result);
    } else {
      handleGetLocationByIP();
    }
  };



  const handleFindCityByCoordinates = async (location: Location) => {
    setLoading(true);
    try {
      const response = await getCityFromCoordinates(location)
      setLocation((prev) => {
        handleSetToLocalStorage(prev);
        return { ...prev, name: response[0].name, state: response[0].state, country: "Ukraine" };
      });
    } catch (err) {
      console.error("handleFindCityByCoordinates", err);
    } finally {
      setLoading(false);
    }
  };





  const pairCategoryBlock = () => {
    let pairs = [];
    for (let i = 0; i < TODAY_WEATHER_INFO.length; i += 2) {
      const rowWElements = TODAY_WEATHER_INFO.slice(i, i + 2);
      const row = (
        <div key={i} className="category-row">
          {rowWElements.map((element, index) => (
            <TodayWeatherInfoContainer todayInfo={element} key={index} />
          ))}
        </div>
      );
      pairs.push(row);
    }
    return pairs;
  };

  const WIND_UVINDEX_SECTIONS: WindIndexProps[] = [
    {
      name: WIND_UVINDEX_SECTIONS_VALUES[0].name,
      icon: ThermostatOutlinedIcon,
      component: <UvIndexSection />,
    },
    {
      name: WIND_UVINDEX_SECTIONS_VALUES[1].name,
      icon: StormIcon,
      component: <WindInfoContainer />,
    },
  ];

  const HOURLY_WEEKLY_FORECAST: ForecastArray[] = [
    {
      icon: AccessTimeIcon,
      title: HOURLY_WEEKLY_FORECAST_TITLE.hourly,
      array: hourlyForecast,
    },
    {
      icon: CalendarTodayOutlinedIcon,
      title: HOURLY_WEEKLY_FORECAST_TITLE.weekly,
      array: weeklyForecast,
    },
  ];

  const WIND_INFO: WindProps[] = [
    {
      category: WIND_CATEGORY.wind,
      value: todayWeatherInfo?.windSpeed,
      measurement: WIND_MEASUREMENT.speed,
    },
    {
      category: WIND_CATEGORY.gust,
      value: todayWeatherInfo?.gust,
      measurement: WIND_MEASUREMENT.gust,
    },
  ];

  const providerValues: ProviderValues = {
    HOURLY_WEEKLY_FORECAST,
    WIND_UVINDEX_SECTIONS,
    WIND_INFO,
    todayWeatherInfo,
    hourlyForecast,
    weeklyForecast,
    locationExist,
    location,
    loading,
    cities,
    error,
    pairCategoryBlock,
    handleGetLocationByIP,
    handleChangeSelectedCity,
  };

  return (
    <WeatherContext.Provider value={providerValues}>
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => {
  const weatherContext = useContext(WeatherContext);

  if (!weatherContext) {
    throw Error("Weather context is not found");
  }
  return weatherContext;
};
