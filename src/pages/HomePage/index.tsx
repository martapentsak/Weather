import { HomePageContainer } from "../../components/HomePageContainer"

import clearSky from "../../assets/images/clearSky.jpg"
import { useWindow } from "../../context/window"
// import { Map } from "../../components/Map"
import { useModal } from "../../context/modal"
import { ModalWindow } from "../../components/Modal"

export const HomePage = () => {
    const {windowWidth} = useWindow()

    return (
        <div className="home-page">
        
            {windowWidth > 450 ? <HomePageContainer/> : <HomePageContainer/>}
        </div>
    )
}