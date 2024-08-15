import Lottie from "lottie-react";
import weatherAnimation from "../../animation/Animation - 1721840578764.json";


type WeatherAnimationIconProps = {
    height: string;
    width: string;
    animation: object;
  };

export const WeatherAnimationIcon = ({height, width, animation} : WeatherAnimationIconProps) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: weatherAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div>
      <Lottie
        animationData={animation}
        loop={true}
        autoplay={true}
        style={{ height: height, width: width }}
      />
    </div>
  );
};
