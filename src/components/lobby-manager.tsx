import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";
import { useEffect } from "react";
import AutoStartCountdown from "./auto-start-countdown";
import { MAX_PLAYERS } from "../global-constants";

interface LobbyManagerProps {
  playerId: Id<"Players">;
  lobbyId: Id<"Lobbies"> | undefined;
  onLobbyJoined: (lobbyId: Id<"Lobbies">) => void;
}

export default function LobbyManager({
  playerId,
  lobbyId,
  onLobbyJoined,
}: LobbyManagerProps) {
  const player = useQuery(api.players.get, playerId ? { playerId } : "skip");
  // TODO(rgroves): Need to add a validation query so that if a lobbyId is
  //                passed in, there is a check that the player belongs to that
  //                lobby otherwise this component will just render "Loading..."
  const lobby = useQuery(api.lobbies.get, lobbyId ? { lobbyId } : "skip");
  const assignLobby = useMutation(api.lobbies.assign);
  const openPlayerSlots = MAX_PLAYERS - (lobby?.lobbyPlayers.length ?? 0);
  const isWaitingForPlayers = openPlayerSlots > 0;

  useEffect(() => {
    const assignLobbyAsync = async () => {
      const lobbyInfo = await assignLobby({
        playerId,
      });
      onLobbyJoined(lobbyInfo.lobbyId);
    };

    if (!lobbyId) {
      assignLobbyAsync().catch((error: unknown) => {
        console.error(error);
      });
    }
  }, [lobbyId, playerId, assignLobby, onLobbyJoined]);

  if (!player) {
    console.log("In LobbyManager player not found");
    // TODO(rgroves): Can't navigate here because the component renders multiple
    //                times before the player useQuery is resolved; need to
    //                an error in the convext query, catch that, and use it to
    //                trigger the navigate
    // return <Navigate to="/" />;
  }

  const msg = `(or wait for up to ${openPlayerSlots.toString()} more player${openPlayerSlots > 1 ? "s" : ""})`;

  return (
    <div>
      {lobby ?
        <>
          <h1>{lobby.lobbyName}</h1>
          <h2>Players In Lobby</h2>
          <ul>
            {lobby.lobbyPlayers.map((player) => (
              <li key={player._id}>{player.nickname}</li>
            ))}
          </ul>
          <a id="startBtn" className="button" href="/game">
            Start Game Now
          </a>

          {isWaitingForPlayers && <p>{msg}</p>}
          <AutoStartCountdown shouldCountdown={!isWaitingForPlayers} />
        </>
      : <p>Loading...</p>}
    </div>
  );
}
