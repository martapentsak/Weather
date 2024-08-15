import Lottie from "lottie-react";
import weatherAnimation from "../../animation/loading.json"


;

export const LoadingPage = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: weatherAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="loading-page">
       <Lottie
        animationData={weatherAnimation}
        loop={true}
        autoplay={true}
        style={{ height: 600, width: 600 }}
      />
    </div>
  );
};
