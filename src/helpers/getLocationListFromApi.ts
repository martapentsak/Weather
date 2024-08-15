import axios from "axios"
import { CITIES_API } from "../constants/api"


type City = {
    city: string;
    country: string;
    long: number,
    lat: number
  }


export const getLocationList = async() : Promise<City[]> => {
    const response = await axios.get(CITIES_API);
    const allList: City[] = response.data.data;
    const cityCountryList = allList.map(({ city, country, long, lat }) => ({ city, country, long, lat }));
    return cityCountryList;
}