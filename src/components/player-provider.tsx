import { createContext, useContext } from "react";

interface PlayerContextType {
  playerInfo: PlayerInfo;
  setPlayerInfo: React.Dispatch<React.SetStateAction<PlayerInfo>> | null;
}

const PlayerContext = createContext<PlayerContextType | null>(null);

export function usePlayer() {
  const context = useContext(PlayerContext);

  if (!context) {
    throw new Error("usePlayer must be used within a PlayerProvider");
  }

  return context;
}

export function PlayerProvider({
  playerInfo,
  setPlayerInfo = null,
  children,
}: {
  playerInfo: PlayerInfo;
  setPlayerInfo?: React.Dispatch<React.SetStateAction<PlayerInfo>> | null;
  children: JSX.Element;
}) {
  return (
    <PlayerContext.Provider value={{ playerInfo, setPlayerInfo }}>
      {children}
    </PlayerContext.Provider>
  );
}
