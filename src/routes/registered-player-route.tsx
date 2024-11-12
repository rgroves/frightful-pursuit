import React from "react";
import { Navigate } from "react-router-dom";
import { PlayerInfo } from "../types";

interface RegisteredPlayerRouteProps {
  playerInfo: PlayerInfo;
  children: React.JSX.Element;
}

export default function RegisteredPlayerRoute({
  playerInfo,
  children,
}: RegisteredPlayerRouteProps) {
  if (!playerInfo.playerId) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
}
