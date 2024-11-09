import { useState, useEffect } from "react";

const anonymousPlayerInfo = { nickname: "Anonymous" };
const key = "frightfulPursuit_playerInfo";

export default function usePlayerInfo(): [
  PlayerInfo,
  (value: PlayerInfo) => void,
] {
  const [playerInfo, setPlayerInfo] = useState<PlayerInfo>(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : anonymousPlayerInfo;
    } catch (error) {
      console.error(error);
      return anonymousPlayerInfo;
    }
  });

  useEffect(() => {
    try {
      console.debug(
        `Storing PlayerInfo in LocalStorage: ${JSON.stringify(playerInfo)}`,
      );
      localStorage.setItem(key, JSON.stringify(playerInfo));
    } catch (error) {
      console.error(error);
    }
  }, [key, playerInfo]);

  return [playerInfo, setPlayerInfo];
}
