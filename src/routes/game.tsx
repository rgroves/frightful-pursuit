import PlayerProvider from "../components/player-provider";
import usePlayer from "../hooks/use-player";
import useLocalPlayerInfo from "../hooks/use-local-player-info";
import RegisteredPlayerRoute from "./registered-player-route";

function Game() {
  const { playerInfo } = usePlayer();
  console.log("In Game >>>", playerInfo);

  return <h1>Game</h1>;
}

export default function GameWithPlayerInfo() {
  const [playerInfo] = useLocalPlayerInfo();

  return (
    <PlayerProvider playerInfo={playerInfo}>
      <RegisteredPlayerRoute playerInfo={playerInfo}>
        <Game />
      </RegisteredPlayerRoute>
    </PlayerProvider>
  );
}
