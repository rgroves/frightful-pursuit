import { useMutation } from "convex/react";
import { useEffect, useRef, useState } from "react";
import { Form } from "react-router-dom";
import { api } from "../../convex/_generated/api";
import PlayerProvider from "../components/player-provider";
import usePlayer from "../hooks/use-player";
import useLocalPlayerInfo from "../hooks/use-local-player-info";

function PlayerRegistrationForm({
  onPlayerRegistered,
}: {
  onPlayerRegistered: (player: PlayerInfo) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [nickname, setNickname] = useState("");
  const registerPlayerMutation = useMutation(api.players.registerPlayer);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();

        const registerPlayer = async (nickname: string) => {
          const player = await registerPlayerMutation({
            playerNickname: nickname,
          });
          onPlayerRegistered({
            playerId: player.id,
            nickname: player.nickname,
          });
        };

        registerPlayer(nickname).catch((error: unknown) => {
          console.error(error);
        });
      }}
    >
      <input
        ref={inputRef}
        name="nickname"
        type="text"
        required
        minLength={2}
        maxLength={20}
        onChange={(e) => {
          setNickname(e.target.value);
        }}
        value={nickname}
      />
      <button type="submit">Register</button>
    </Form>
  );
}

export function Index() {
  const { playerInfo, setPlayerInfo } = usePlayer();

  const NewPlayerForm = (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        if (!setPlayerInfo) {
          throw new Error("Unable to set Player Info.");
        }
        setPlayerInfo({ playerId: undefined, nickname: "" });
      }}
    >
      <input name="newPlayer" type="checkbox" hidden readOnly checked />
      <button type="submit">New Player</button>
    </Form>
  );

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
          <button>Play</button>
          {NewPlayerForm}
        </>
      : <PlayerRegistrationForm
          onPlayerRegistered={(player) => {
            if (!setPlayerInfo) {
              throw new Error("Unable to set Player Info.");
            }
            setPlayerInfo(player);
          }}
        />
      }
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
