import { PlayerProvider, usePlayer } from "../components/player-provider";
import usePlayerInfo from "../hooks/use-player-info";
import RegisteredPlayerRoute from "./registered-player-route";

function Lobby() {
  const { playerInfo } = usePlayer();
  console.log("In Lobby >>>", playerInfo);

  return <h1>Lobby</h1>;
}

export default function LobbyWithPlayerInfo() {
  const [playerInfo, _] = usePlayerInfo();

  return (
    <PlayerProvider playerInfo={playerInfo}>
      <RegisteredPlayerRoute playerInfo={playerInfo}>
        <Lobby />
      </RegisteredPlayerRoute>
    </PlayerProvider>
  );
}
