import { useMutation } from "convex/react";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { api } from "../../convex/_generated/api";
import PlayerProvider from "../components/player-provider";
import PlayerRegistrationForm from "../components/player-registration-form";
import PlayerResetForm from "../components/player-reset-form";
import useLocalPlayerInfo from "../hooks/use-local-player-info";
import usePlayer from "../hooks/use-player";

export function Index() {
  const registerPlayerMutation = useMutation(api.players.registerPlayer);
  const { playerInfo, setPlayerInfo } = usePlayer();
  const [shouldRedirectToLobby, setShouldRedirectToLobby] = useState(false);

  const handlePlayerRegistered = (nickname: string) => {
    const registerPlayer = async (nickname: string) => {
      const player = await registerPlayerMutation({
        playerNickname: nickname,
      });
      setPlayerInfo({
        playerId: player.id,
        nickname: player.nickname,
      });
      setShouldRedirectToLobby(true);
    };

    registerPlayer(nickname).catch((error: unknown) => {
      console.error(error);
    });
  };

  if (shouldRedirectToLobby) {
    return <Navigate to="/lobby" />;
  }

  return (
    <>
      <p>Welcome, {playerInfo.nickname || "Anonymous"}!</p>
      <p>
        You are about to play Frightful Pursuit, if you dare! Can you survive
        the terror-filled trivia and reach the end before an icon of horror
        catches you?
      </p>
      {playerInfo.playerId ?
        <>
          <PlayerResetForm
            onPlayerReset={() => {
              setPlayerInfo({ nickname: "" });
              setShouldRedirectToLobby(false);
            }}
          />
        </>
      : <PlayerRegistrationForm onPlayerRegistered={handlePlayerRegistered} />}
    </>
  );
}

export default function IndexWithPlayerInfo() {
  const [playerInfo, setPlayerInfo] = useLocalPlayerInfo();

  return (
    <PlayerProvider playerInfo={playerInfo} setPlayerInfo={setPlayerInfo}>
      <Index />
    </PlayerProvider>
  );
}
