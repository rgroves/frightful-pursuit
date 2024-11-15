import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getForLobby = query({
  args: {
    lobbyId: v.id("Lobbies"),
  },
  handler: async (ctx, { lobbyId }) => {
    return await ctx.db
      .query("Games")
      .filter((q) => q.eq(q.field("lobbyId"), lobbyId))
      .unique();
  },
});

export const create = mutation({
  args: {
    lobbyId: v.id("Lobbies"),
  },
  handler: async (ctx, { lobbyId }) => {
    const existingGame = await ctx.db
      .query("Games")
      .filter((q) => q.eq(q.field("lobbyId"), lobbyId))
      .unique();

    if (existingGame) {
      return existingGame;
    }

    const gameId = await ctx.db.insert("Games", {
      lobbyId,
      status: "INITIALIZING",
    });

    if (!gameId) {
      throw new Error("Failed to create game");
    }

    const newGame = await ctx.db.get(gameId);

    if (!newGame) {
      throw new Error("Failed to retrieve new game");
    }

    return newGame;
  },
});
