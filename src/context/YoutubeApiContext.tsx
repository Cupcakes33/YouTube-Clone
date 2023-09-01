import { createContext } from "react";
import YoutubeInstance, { IYoutubeInstance } from "../service/youtubeInstance";

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
