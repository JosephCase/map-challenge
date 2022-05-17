import { google, Loader, LoaderOptions } from "google-maps";
import React, { useEffect, useState, createContext } from "react";

export const MapContext = createContext<google | null>(null);

type Props = {
  children: React.ReactNode;
};

const GoogleMapsProvider = ({ children }: Props) => {
  const [googleApi, setGoogleApi] = useState<google | null>(null);

  useEffect(() => {
    async function initGoogle() {
      const options: LoaderOptions = {};
      const loader = new Loader(
        "AIzaSyCMErIWnUJ-sPfAP8RMB9uCJH5iiVK9WYc",
        options
      );

      const ggApi = await loader.load();
      setGoogleApi(ggApi);
    }
    // load the api if not already loaded
    console.log({ googleApi });
    initGoogle();
  }, []);

  return googleApi ? (
    <MapContext.Provider value={googleApi}>{children}</MapContext.Provider>
  ) : null;
};

export default GoogleMapsProvider;
