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
import nightClear from "../assets/icons/nightClear.png"


const hours = new Date().getHours()

const isDayTime = hours > 6 && hours <= 21





export const weatherIconIdentify = (todayWeatherInfo : TodayWeather)  => {



     if (todayWeatherInfo.condition  === "Clouds" ) {
        return isDayTime ?  dayFewClouds : nigthFewClouds
    } 
    else if ( todayWeatherInfo.condition  === "Clouds" ) {
        return cloudWeather
    }
    else if (todayWeatherInfo.condition  === "Rain" ) {
        return isDayTime ? dayLightRain : nightLightRain
    } 
     else if (todayWeatherInfo.condition  === "Rain") {
        return isDayTime ? dayRain : nightLightRain
    } 
    else if (todayWeatherInfo.condition  === "Clear" ||  todayWeatherInfo.condition  === "Sunny") {
        return isDayTime ?  dayClearSky : nightClearSky
    } else {
        return cloudWeather
    }

}

export const hourlyWeatherIconIdentify = (weather : HourlyForecast) => {
    const hours = Number(weather.time?.slice(0, 2))
    const isDay = hours > 5 && hours <= 21
 
     if ( weather.condition  === "Sunny" ) {
        return !weather.time? sunny : isDay ?  sunny : nightClear
    }
     else if (weather.condition  === "Overcast" || weather.condition  === "Overcast") {
        return  cloud 
    } 
    else if (weather.condition  === "Clear") {
        return !weather.time? sunny  : isDay ?  sunny : nightClear
    } 
    else if (weather.condition?.includes("rain")) {
        return lightRain
    }else {
        return cloud
    }
}