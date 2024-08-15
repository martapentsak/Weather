import { ReactNode, createContext, useContext, useEffect, useState } from "react";

type ProviderValues = {
    windowWidth: number
};

export const WindowContext = createContext({} as ProviderValues);

type Props = {
  children: ReactNode;
};

export const WindowProvider = ({ children }: Props) => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);



  
    useEffect(() => {
        const handleResize = () => {
          setWindowWidth(window.innerWidth);
        };
        window.addEventListener("resize", handleResize);
        return () => {
          window.removeEventListener("resize", handleResize);
        };
      }, []);

 
 


  const providerValues: ProviderValues = {
    windowWidth
  };

  return (
    <WindowContext.Provider value={providerValues}>
      {children}
    </WindowContext.Provider>
  );
};

export const useWindow = () => {
  const windowContext = useContext(WindowContext);

  if (!windowContext) {
    throw Error("Weather context is not found");
  }
  return windowContext;
};
