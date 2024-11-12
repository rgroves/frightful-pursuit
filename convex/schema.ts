import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  Players: defineTable({
    nickname: v.string(),
  }),
  Lobbies: defineTable({
    name: v.string(),
    status: v.string(),
    playerCount: v.number(),
  }),
  PlayersLobbies: defineTable({
    playerId: v.id("Players"),
    lobbyId: v.id("Lobbies"),
  }),
  Games: defineTable({
    lobbyId: v.id("Lobbies"),
    status: v.string(),
  }),
});
