import { createContext, useState, useContext } from "react";
import type { ReactNode } from "react";

import PageLoader from "../components/loading/PageLoader";

type LoaderContextType = {
  showLoader: (message?: string) => void;
  hideLoader: () => void;
};

const LoaderContext = createContext<LoaderContextType>({
  showLoader: () => {},
  hideLoader: () => {},
});

interface LoaderProviderProps {
  children: ReactNode;
}

export function LoaderProvider({ children }: LoaderProviderProps) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string>("Cargando");

  const showLoader = (msg?: string) => {
    setMessage(msg || "Cargando");
    setLoading(true);
  };

  const hideLoader = () => {
    setLoading(false);
  };

  return (
    <LoaderContext.Provider value={{ showLoader, hideLoader }}>
      {loading && <PageLoader text={message} />}
      {children}
    </LoaderContext.Provider>
  );
}

export const useLoader = () => useContext(LoaderContext);