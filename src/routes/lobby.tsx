import PlayerProvider from "../components/player-provider";
import usePlayer from "../hooks/use-player";
import useLocalPlayerInfo from "../hooks/use-local-player-info";
import RegisteredPlayerRoute from "./registered-player-route";
import LobbyManager from "../components/lobby-manager";
import { Id } from "../../convex/_generated/dataModel";
import { useCallback } from "react";

function Lobby() {
  const { playerInfo, setPlayerInfo } = usePlayer();
  const playerId = playerInfo.playerId ? playerInfo.playerId : null;
  const lobbyId = playerInfo.lobbyId;

  const handleLobbyJoined = useCallback(
    (lobbyId: Id<"Lobbies">) => {
      setPlayerInfo({ ...playerInfo, lobbyId });
    },
    [playerInfo, setPlayerInfo],
  );

  if (!playerId) {
    throw new Error("Player ID invalid.");
  }

  return (
    <LobbyManager
      playerId={playerId}
      lobbyId={lobbyId}
      onLobbyJoined={handleLobbyJoined}
    />
  );
}

export default function LobbyWithPlayerInfo() {
  const [playerInfo, setPlayerInfo] = useLocalPlayerInfo();

  return (
    <PlayerProvider playerInfo={playerInfo} setPlayerInfo={setPlayerInfo}>
      <RegisteredPlayerRoute playerInfo={playerInfo}>
        <Lobby />
      </RegisteredPlayerRoute>
    </PlayerProvider>
  );
}
