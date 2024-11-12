import { mutation, query } from "./_generated/server";
import { v, ConvexError } from "convex/values";
import {
  resolveLobbyPlayers,
  resolvePlayer,
  resolvePlayerLobby,
} from "./helpers";

export const get = query({
  args: {
    lobbyId: v.id("Lobbies"),
  },
  handler: async (ctx, { lobbyId }) => {
    const lobby = await ctx.db.get(lobbyId);

    if (!lobby) {
      throw new ConvexError("Lobby not found");
    }

    const lobbyPlayers = await resolveLobbyPlayers(ctx, lobby._id);

    return {
      lobbyId: lobby._id,
      lobbyName: lobby.name,
      lobbyStatus: lobby.status,
      lobbyPlayers,
    };
  },
});

export const assign = mutation({
  args: {
    playerId: v.optional(v.id("Players")),
  },
  handler: async (ctx, { playerId }) => {
    const player = await resolvePlayer(ctx, playerId);

    if (!player) {
      throw new ConvexError("Player not found");
    }

    const lobby = await resolvePlayerLobby(ctx, player._id);

    if (!lobby) {
      throw new Error("Lobby not found");
    }

    const lobbyPlayers = await resolveLobbyPlayers(ctx, lobby._id);

    return {
      lobbyId: lobby._id,
      lobbyName: lobby.name,
      lobbyStatus: lobby.status,
      lobbyPlayers,
    };
  },
});
