
import Modal from "@mui/material/Modal";
import { useModal } from "../../context/modal";
import { useWeather } from "../../context/weather";




export const ModalWindow = () => {
    const {location} = useWeather()
  const { isModalOpen, handlecloseModal } = useModal();
  return (

 <Modal
      open={isModalOpen}
      onClose={handlecloseModal}

    >
      <div className="modal">
        <div className="img-section">
        <img  src="https://img.freepik.com/free-vector/grey-circle-map-with-red-location-pin_78370-4985.jpg?semt=ais_hybrid" className="map-img"/>

        </div>
        <div className="location-check-section">
            <h4 className="location-check">Is this Your location?</h4>
          <p className="location"> {location.name}, {location.country}</p>
        </div>
        <div className="btns-section">
            <button className="btn-location-check">Yes</button>
            <button className="btn-location-check">No</button>

        
        </div>
     
        

      </div>
    </Modal>   
  );
};
