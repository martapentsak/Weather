import axios from "axios";
import { Location } from "../../types";

export const getCityFromCoordinates = async(location: Location) => {
    try {
        const response = await axios.get(
            `https://api.openweathermap.org/geo/1.0/reverse?lat=${location.latitude}&lon=${location.longitude}&limit=5&appid=fa8d1319e2c547e0860f1dba63afa352`
          );
           return response.data
    } catch (err) {
      console.error("getCityFromCoordinates", err);
    } 
}