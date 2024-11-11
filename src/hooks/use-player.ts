import { useContext } from "react";
import { createContext } from "react";

interface PlayerContextType {
  playerInfo: PlayerInfo;
  setPlayerInfo: React.Dispatch<React.SetStateAction<PlayerInfo>>;
}

export const PlayerContext = createContext<PlayerContextType | null>(null);

export default function usePlayer() {
  const context = useContext(PlayerContext);

  if (!context) {
    throw new Error("usePlayer must be used within a PlayerProvider");
  }

  return context;
}
