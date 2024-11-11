import React from "react";
import { PlayerContext } from "../hooks/use-player";

export default function PlayerProvider({
  playerInfo,
  setPlayerInfo = null,
  children,
}: {
  playerInfo: PlayerInfo;
  setPlayerInfo?: React.Dispatch<React.SetStateAction<PlayerInfo>> | null;
  children: React.JSX.Element;
}) {
  return (
    <PlayerContext.Provider value={{ playerInfo, setPlayerInfo }}>
      {children}
    </PlayerContext.Provider>
  );
}
