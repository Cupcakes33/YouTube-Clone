import { createContext, useContext } from "react";
import YoutubeInstance from "../service/youtubeInstance";

export const YoutubeApiContext = createContext();
const youtubeInstance = new YoutubeInstance();

export function YoutubeApiProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <YoutubeApiContext.Provider value={{ youtubeInstance }}>
      {children}
    </YoutubeApiContext.Provider>
  );
}

export function useYoutubeApi() {
  return useContext(YoutubeApiContext);
}
