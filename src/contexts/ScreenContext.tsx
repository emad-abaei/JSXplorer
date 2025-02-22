import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode
} from "react";

interface ScreenProviderProps {
  children: ReactNode;
}

const ScreenContext = createContext({ isSmallScreen: false });

function ScreenProvider({ children }: ScreenProviderProps) {
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);

  useEffect(() => {
    const checkScreenSize = () => setIsSmallScreen(window.innerWidth <= 768);

    checkScreenSize();

    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <ScreenContext.Provider value={{ isSmallScreen }}>
      {children}
    </ScreenContext.Provider>
  );
}

function useScreen() {
  const ctx = useContext(ScreenContext);

  if (ctx === undefined)
    throw new Error("useScreen must be used within the ScreenProvider");

  return ctx;
}

export { ScreenProvider, useScreen };
