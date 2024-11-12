import { type Id } from "../convex/_generated/dataModel";

export interface PlayerInfo {
  nickname: string;
  playerId?: Id<"Players"> | undefined;
  lobbyId?: Id<"Lobbies"> | undefined;
  gameId?: Id<"Games"> | undefined;
}
