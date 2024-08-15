import { TODAY_WEATHER_INFO_CATEGORY_NAME } from '../textValues';

import { SvgIconComponent } from '@mui/icons-material';
import ThermostatOutlinedIcon from '@mui/icons-material/ThermostatOutlined';
import WaterDropOutlinedIcon from '@mui/icons-material/WaterDropOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import OpacityOutlinedIcon from '@mui/icons-material/OpacityOutlined';



type TodayWeather = {
    feelsLike: number | null,
    humidity: number | null,
    visibility: number | null,
    pressure: number | null
  
  
  }


type Props = {
    icon: SvgIconComponent;
    category: string,
    value: (todayWeatherInfo : TodayWeather) => string, 
    desc: string
}


export const TODAY_WEATHER_INFO : Props[] =  [
    {
        icon: ThermostatOutlinedIcon,
        category:  TODAY_WEATHER_INFO_CATEGORY_NAME.firstCategory,
        value: (todayWeatherInfo : TodayWeather) =>  todayWeatherInfo.feelsLike + "°",
        desc: TODAY_WEATHER_INFO_CATEGORY_NAME.desc.feelsLike
    },
    {
        icon: WaterDropOutlinedIcon,
        category:  TODAY_WEATHER_INFO_CATEGORY_NAME.secondCategory,
        value: (todayWeatherInfo : TodayWeather) =>  todayWeatherInfo.pressure + "hPa",
        desc: TODAY_WEATHER_INFO_CATEGORY_NAME.desc.pressure

    },
    {
        icon: RemoveRedEyeOutlinedIcon,
        category:  TODAY_WEATHER_INFO_CATEGORY_NAME.thirdCategory,
        value: (todayWeatherInfo : TodayWeather) =>  todayWeatherInfo.visibility + "km",
        desc: TODAY_WEATHER_INFO_CATEGORY_NAME.desc.visibiliy


    },
    {
        icon: OpacityOutlinedIcon,
        category:  TODAY_WEATHER_INFO_CATEGORY_NAME.fourthCategory,
        value: (todayWeatherInfo : TodayWeather) =>  todayWeatherInfo.humidity  + "%",
        desc: TODAY_WEATHER_INFO_CATEGORY_NAME.desc.humidity
    }
    
]


