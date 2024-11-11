import React from "react";
import { Navigate } from "react-router-dom";

export default function RegisteredPlayerRoute({
  playerInfo,
  children,
}: {
  playerInfo: PlayerInfo;
  children: React.JSX.Element;
}) {
  if (!playerInfo.playerId) {
    return <Navigate to="/" />;
  }

  return <>{children};</>;
}
