import React from "react";
import { PlayerContext } from "../hooks/use-player";
import { PlayerInfo } from "../types";

interface PlayerProviderProps {
  playerInfo: PlayerInfo;
  setPlayerInfo?: React.Dispatch<React.SetStateAction<PlayerInfo>>;
  children: React.JSX.Element;
}

const setPlayerInfoStub = () => {
  // If you are seeing this error in the console: check if the route
  // generating the error truly needs to call setPlayerInfo. If so, ensure
  // that in the [RoutName]WithPlayerInfo component that setPlayerInfo is
  // being passed as a prop to the PlayerProvider.
  const msg = "Invalid PlayerProvider state: setPlayerInfo not set.";
  console.error(msg);
  throw new Error(msg);
};

export default function PlayerProvider({
  playerInfo,
  setPlayerInfo = setPlayerInfoStub,
  children,
}: PlayerProviderProps) {
  return (
    <PlayerContext.Provider value={{ playerInfo, setPlayerInfo }}>
      {children}
    </PlayerContext.Provider>
  );
}
