import usePlayerInfo from "../hooks/usePlayerInfo.react";

export default function Index() {
  const [playerInfo, _setPlayerInfo] = usePlayerInfo();
  console.log(playerInfo);

  return (
    <>
      <p>
        Welcome to Frightful Pursuit! Can you survive the terror-filled trivia
        and reach the end before an icon of horror catches you?
      </p>
      <div>
        Welcome, {playerInfo.nickname}!<div>{JSON.stringify(playerInfo)}</div>
      </div>
      {playerInfo.playerId ?
        <button>Play</button>
      : <button>Register</button>}
    </>
  );
}
