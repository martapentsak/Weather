import { useState } from "react";

import { useWeather } from "../../context/weather";

import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";

import cities from "../../cities.json"

export const LocationSelector = () => {
  const { location, handleChangeSelectedCity } = useWeather();
  const [inputValue, setInputValue] = useState<string>("");

  const filterCites = (value: string | null) => {
    cities.filter(v => v.city.includes(value))
  }

  return (
    <div className="location-selector-container">
      <Autocomplete
        value={location.name + ", " + location.country}
        onChange={(event: any, newValue: string | null) => {
          handleChangeSelectedCity(newValue);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
          // filterCites(newInputValue)

        }}
        id="controllable-states-demo"
        options={cities.map(city => `${city.city}, ${city.country}`)}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} />}
      />
      <i className="location-icon">
        <LocationOnOutlinedIcon fontSize="small" />
      </i>
    </div>
  );
};
