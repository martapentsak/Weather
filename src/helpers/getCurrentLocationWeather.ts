export const getLocationWeather = (latitude: number | null, longitude: number  | null) => {
    if (latitude && longitude !== null)
    return `https://weatherapi-com.p.rapidapi.com/current.json?q=${latitude}%2C+${longitude}`
}