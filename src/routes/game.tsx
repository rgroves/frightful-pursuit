import { PlayerProvider, usePlayer } from "../components/player-provider";
import usePlayerInfo from "../hooks/use-player-info";
import RegisteredPlayerRoute from "./registered-player-route";

function Game() {
  const { playerInfo } = usePlayer();
  console.log("In Game >>>", playerInfo);

  return <h1>Game</h1>;
}

export default function GameWithPlayerInfo() {
  const [playerInfo] = usePlayerInfo();

  return (
    <PlayerProvider playerInfo={playerInfo}>
      <RegisteredPlayerRoute playerInfo={playerInfo}>
        <Game />
      </RegisteredPlayerRoute>
    </PlayerProvider>
  );
}
