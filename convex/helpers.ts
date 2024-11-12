import type { DataModel, Doc, Id } from "./_generated/dataModel";
import type { GenericMutationCtx, GenericQueryCtx } from "convex/server";

export async function resolvePlayer(
  ctx: GenericMutationCtx<DataModel>,
  playerId: Id<"Players"> | undefined,
): Promise<Doc<"Players"> | null> {
  if (!playerId) {
    throw new Error("Invalid playerId");
  }

  return ctx.db.get(playerId);
}

export async function resolvePlayerLobby(
  ctx: GenericMutationCtx<DataModel>,
  playerId: Id<"Players">,
): Promise<Doc<"Lobbies"> | null> {
  if (!playerId) {
    throw new Error("Invalid playerId");
  }

  // Check if the player is associated to an existing lobby.
  const lobbyAssociation = await ctx.db
    .query("PlayersLobbies")
    .filter((q) => q.eq(q.field("playerId"), playerId))
    .unique();

  if (lobbyAssociation) {
    return await ctx.db.get(lobbyAssociation.lobbyId);
  }

  // If player is not in an existing lobby, find an open lobby or create a new one to place them in.
  const openLobby = await ctx.db
    .query("Lobbies")
    .filter((q) => q.eq(q.field("status"), "open"))
    .first();

  if (openLobby) {
    const status = openLobby.playerCount === 3 ? "closed" : "open";
    await ctx.db.patch(openLobby._id, {
      status,
      playerCount: openLobby.playerCount + 1,
    });
  }

  const lobbyId =
    openLobby?._id ??
    (await ctx.db.insert("Lobbies", {
      name: `Lobby ${Math.floor(Math.random() * 1000).toString()}`,
      status: "open",
      playerCount: 1,
    }));

  if (!lobbyId) {
    throw new Error("Failed to find or create lobby");
  }

  await ctx.db.insert("PlayersLobbies", {
    playerId,
    lobbyId,
  });

  return ctx.db.get(lobbyId);
}

export async function resolveLobbyPlayers(
  ctx: GenericMutationCtx<DataModel> | GenericQueryCtx<DataModel>,
  lobbyId: Id<"Lobbies">,
): Promise<Doc<"Players">[]> {
  const lobbyPlayers = await Promise.all(
    (
      await ctx.db
        .query("PlayersLobbies")
        .filter((q) => q.eq(q.field("lobbyId"), lobbyId))
        .order("asc")
        .collect()
    ).map((row) => ctx.db.get(row.playerId)),
  );
  return lobbyPlayers.filter((player) => player !== null);
}
