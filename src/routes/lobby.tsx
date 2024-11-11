import PlayerProvider from "../components/player-provider";
import usePlayer from "../hooks/use-player";
import useLocalPlayerInfo from "../hooks/use-local-player-info";
import RegisteredPlayerRoute from "./registered-player-route";

function Lobby() {
  const { playerInfo } = usePlayer();
  console.log("In Lobby >>>", playerInfo);

  return <h1>Lobby</h1>;
}

export default function LobbyWithPlayerInfo() {
  const [playerInfo] = useLocalPlayerInfo();

  return (
    <PlayerProvider playerInfo={playerInfo}>
      <RegisteredPlayerRoute playerInfo={playerInfo}>
        <Lobby />
      </RegisteredPlayerRoute>
    </PlayerProvider>
  );
}
