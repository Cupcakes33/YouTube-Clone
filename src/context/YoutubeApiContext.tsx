import { createContext } from "react";
import YoutubeInstance from "../service/youtubeInstance";
import { IYoutubeInstance } from "../types/instance";

type ContextProps = {
  instance: IYoutubeInstance;
};

export const YoutubeApiContext = createContext<ContextProps | null>(null);
const instance = new YoutubeInstance();

export function YoutubeApiProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <YoutubeApiContext.Provider value={{ instance }}>
      {children}
    </YoutubeApiContext.Provider>
  );
}
