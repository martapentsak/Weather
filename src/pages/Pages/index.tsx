
import { useWeather } from "../../context/weather"

import { HomePage } from "../HomePage"
import { LoadingPage } from "../LoadingPage"

export const Pages = () => {
    const {loading} = useWeather()






    return (
        <div>
            {loading ? <LoadingPage/> : <HomePage/>}
        </div>
   
    )
}