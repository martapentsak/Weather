import axios from "axios"

export const getLocationFromCityName = async(city: string) => {
    const URL = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=93ff8c87416b2085fe5cb5665bf8658d`
    const response = await axios.get(URL)
    const currentLocation = response.data.find((e: any) => e.name === city)

    const result = {
        latitude: currentLocation.lat,
        longitude: currentLocation.lon,
        name: currentLocation.name,
        country: currentLocation.country,
        state: currentLocation.state
    }
    return result

}