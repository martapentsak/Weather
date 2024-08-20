import { HourlyForecast } from './../types/index';
import { TodayWeather } from "../types"
import cloudWeather from "../animation/Animation - 1721901894903.json"

import dayClearSky from  "../animation/dayClearSky.json"
import dayFewClouds from "../animation/dayFewClouds.json"
import dayLightRain from "../animation/dayLightRain.json"
import dayRain from "../animation/dayRain.json"

import nightClearSky from  "../animation/nightClearSky.json"
import nigthFewClouds from "../animation/nightFewClouds.json"
import nightLightRain from "../animation/nightLightRain.json"


import defaultAnimation from "../animation/Animation - 1721840578764.json"

import lightRain from "../assets/icons/lightRain.png"
import cloud from "../assets/icons/cloud.png"
import clear from "../assets/icons/clear.png"
import sunny from "../assets/icons/sunny.png"
import nightCloud from "../assets/icons/nightClouds.png"
import nightRain from "../assets/icons/nightRain.png"
import nightClear from "../assets/icons/nightClear.png"


const hours = new Date().getHours()

const isDayTime = hours > 6 && hours <= 21





export const weatherIconIdentify = (todayWeatherInfo : TodayWeather)  => {



     if (todayWeatherInfo.condition  === "cloudly" ) {
        return isDayTime ?  dayFewClouds : nigthFewClouds
    } 

    else if (todayWeatherInfo.condition  === "rainy" ) {
        return isDayTime ? dayLightRain : nightLightRain
    } 
    else if (todayWeatherInfo.condition  === "Clear" ||  todayWeatherInfo.condition  === "Sunny") {
        return isDayTime ?  dayClearSky : nightClearSky
    } else {
        return cloudWeather
    }

}

export const hourlyWeatherIconIdentify = (weather : HourlyForecast, sunriseHour: number | null, sunsetHour : number | null) => {
    const hours = Number(weather.time?.slice(0, 2))

    // const condition = hours > sunriseHour && hours <= sunsetHour 


        let isDay = sunsetHour  !== null && sunsetHour !== null ? hours > sunriseHour || hours < sunsetHour + 1 : true

  

    console.log(sunriseHour )
 
     if ( weather.condition  === "sunny" ) {
        return !weather.time? sunny : isDay ?  sunny : nightClear
    }
     else if (weather.condition  === "cloudly") {
        return  !weather.time? cloud : isDay ?  cloud : nightCloud  
    } 
    else if (weather.condition  === "clear") {
        return !weather.time? sunny  : isDay ?  sunny : nightClear
    } 
    else if (weather.condition?.includes("rain")) {
        return !weather.time? lightRain  : isDay ?  lightRain : nightRain 
    }else {
        return cloud
    }
}