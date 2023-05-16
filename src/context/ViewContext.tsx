import { useMediaQuery } from "@chakra-ui/react";
import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";

interface IViewContext {
  isMobile: boolean;
}

export const ViewContext = createContext<IViewContext>({ isMobile: false });

export const ViewContextProvider = ({ children }: { children: ReactNode }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isBelowMobileWidth, isBelowMobileHight] = useMediaQuery([
    "(max-height: 550px)",
    "(max-width: 30em)",
  ]);

  useEffect(() => {
    if (isBelowMobileWidth || isBelowMobileHight) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, [isBelowMobileWidth, isBelowMobileHight]);

  return (
    <ViewContext.Provider value={{ isMobile }}>{children}</ViewContext.Provider>
  );
};

export const useView = () => {
  const context = useContext(ViewContext);
  if (!context) {
    throw new Error("useView must be used within an ViewContextProvider");
  }
  return context;
};
