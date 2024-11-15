import PlayerProvider from "../components/player-provider";
import usePlayer from "../hooks/use-player";
import useLocalPlayerInfo from "../hooks/use-local-player-info";
import RegisteredPlayerRoute from "./registered-player-route";
import GameManager from "../components/game-manager";

function Game() {
  const { playerInfo } = usePlayer();
  const { gameId = undefined } = playerInfo;
  return gameId ? <h1>TODO: Render Game Board</h1> : <GameManager />;
}

export default function GameWithPlayerInfo() {
  const [playerInfo, setPlayerInfo] = useLocalPlayerInfo();

  return (
    <PlayerProvider playerInfo={playerInfo} setPlayerInfo={setPlayerInfo}>
      <RegisteredPlayerRoute playerInfo={playerInfo}>
        <Game />
      </RegisteredPlayerRoute>
    </PlayerProvider>
  );
}
