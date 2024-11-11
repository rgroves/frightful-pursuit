import { useState, useEffect } from "react";

const anonymousPlayerInfo = { nickname: "" };
const key = "frightfulPursuit_playerInfo";

export default function usePlayerInfo(): [
  PlayerInfo,
  React.Dispatch<React.SetStateAction<PlayerInfo>>,
] {
  const [playerInfo, setPlayerInfo] = useState<PlayerInfo>(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : anonymousPlayerInfo;
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
