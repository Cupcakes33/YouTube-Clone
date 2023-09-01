import { useContext } from "react";
import { YoutubeApiContext } from "../context/YoutubeApiContext";


export default function useYouTubeAPI() {
  const context = useContext(YoutubeApiContext);
  if (!context) {
    throw new Error("Cannot find YoutubeApiProvider");
  }
  return context;
}