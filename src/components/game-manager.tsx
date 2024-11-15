import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useEffect, useState } from "react";
import usePlayer from "../hooks/use-player";

// TODO(rgroves): Need to robustify this for scenarios:
//                - playerId is not in lobby players list
//                - Lobby is not found for playerInfo.lobbyId
//                - Game is not found for playerInfo.gameId

export default function GameManager() {
  const { playerInfo, setPlayerInfo } = usePlayer();
  const { playerId, lobbyId, gameId } = playerInfo;
  const lobby = useQuery(api.lobbies.get, lobbyId ? { lobbyId } : "skip");
  const game = useQuery(api.games.getForLobby, lobbyId ? { lobbyId } : "skip");
  const createGame = useMutation(api.games.create);
  const [isLobbyPlayerValidated, setIsLobbyPlayerValidated] = useState(
    Boolean(lobby?.lobbyPlayers.some((p) => p._id === playerId)),
  );

  useEffect(() => {
    if (!lobbyId) {
      throw new Error("Invalid lobbyId");
    }

    if (!isLobbyPlayerValidated) {
      return;
    }

    const createGameAsync = async () => {
      await createGame({ lobbyId });
    };

    createGameAsync().catch((error: unknown) => {
      console.error(error);
    });
  }, [lobbyId, isLobbyPlayerValidated, createGame]);

  if (!playerId) {
    throw new Error("Invalid playerId");
  }

  if (lobby === undefined) {
    return <p>Loading players from lobby...</p>;
  }

  if (game === undefined) {
    return <p>Loading game...</p>;
  }

  if (!isLobbyPlayerValidated) {
    if (lobby.lobbyPlayers.some((p) => p._id === playerId)) {
      setIsLobbyPlayerValidated(true);
    } else {
      // TODO(rgroves): What to do here? Probably means that local storage is jacked.
      //                clear localStorage playerInfo and redirect to home?
      throw new Error("Player missing from lobby");
    }
  }

  if ((game?._id && !gameId) || (game?._id && gameId !== game._id)) {
    // Update playerInfo with gameId.
    setPlayerInfo({ ...playerInfo, gameId: game._id });
  }

  console.log(
    `In GameManager:\n\t` +
      `>>> playerId(${playerId})\n\t` +
      `>>> lobbyId(${lobbyId ?? ""})\n\t` +
      `>>> gameId(${gameId ?? ""})\n\t` +
      `>>> isLobbyPlayerValidated(${isLobbyPlayerValidated.toString()})\n\t`,
  );

  return <h1>Game</h1>;
}
