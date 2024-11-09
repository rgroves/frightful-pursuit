import { Navigate } from "react-router-dom";
import usePlayerInfo from "../hooks/usePlayerInfo.react";

export default function RegisteredPlayerRoute({
  children,
}: {
  children: JSX.Element;
}) {
  const [playerInfo, _] = usePlayerInfo();

  if (!playerInfo.playerId) {
    return <Navigate to="/" />;
  }

  return <>{children};</>;
}
