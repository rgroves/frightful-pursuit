import { Navigate } from "react-router-dom";

export default function RegisteredPlayerRoute({
  playerInfo,
  children,
}: {
  playerInfo: PlayerInfo;
  children: JSX.Element;
}) {
  if (!playerInfo.playerId) {
    return <Navigate to="/" />;
  }

  return <>{children};</>;
}
