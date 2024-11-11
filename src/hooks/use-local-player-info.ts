import { useState, useEffect } from "react";

const anonymousPlayerInfo = { nickname: "" };
const key = "frightfulPursuit_playerInfo";

function validatePlayerInfo(playerInfo: unknown): playerInfo is PlayerInfo {
  if (typeof playerInfo !== "object" || playerInfo === null) {
    return false;
  }

  if (typeof (playerInfo as PlayerInfo).nickname !== "string") {
    return false;
  }

  if (
    Object.getOwnPropertyNames(playerInfo).includes("gameId") &&
    typeof (playerInfo as PlayerInfo).gameId !== "string"
  ) {
    return false;
  }

  if (
    Object.getOwnPropertyNames(playerInfo).includes("lobbyId") &&
    typeof (playerInfo as PlayerInfo).lobbyId !== "string"
  ) {
    return false;
  }

  if (
    Object.getOwnPropertyNames(playerInfo).includes("playerId") &&
    typeof (playerInfo as PlayerInfo).playerId !== "string" &&
    (((playerInfo as PlayerInfo).playerId ?? "").length < 2 ||
      ((playerInfo as PlayerInfo).playerId ?? "").length > 20)
  ) {
    return false;
  }

  return true;
}

export default function useLocalPlayerInfo(): [
  PlayerInfo,
  React.Dispatch<React.SetStateAction<PlayerInfo>>,
] {
  const [playerInfo, setPlayerInfo] = useState<PlayerInfo>(() => {
    try {
      const item = localStorage.getItem(key);
      const playerInfo =
        item ? (JSON.parse(item) as unknown) : anonymousPlayerInfo;
      if (!validatePlayerInfo(playerInfo)) {
        throw new Error("Invalid player info.");
      }
      return playerInfo;
    } catch (error) {
      console.error(error);
      console.warn("Using default anonymous player.");
      return anonymousPlayerInfo;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(playerInfo));
    } catch (error) {
      console.error(error);
    }
  }, [playerInfo]);

  return [playerInfo, setPlayerInfo];
}
