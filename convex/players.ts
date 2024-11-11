import { mutation } from "./_generated/server";
import { ConvexError, v } from "convex/values";

export const registerPlayer = mutation({
  args: {
    playerNickname: v.string(),
  },
  handler: async (ctx, { playerNickname }) => {
    const cleanNickname = playerNickname.trim();

    if (cleanNickname.length < 2 || cleanNickname.length > 20) {
      throw new ConvexError("Nickname must be between 2 and 20 characters");
    }

    const playerId = await ctx.db.insert("Players", {
      nickname: cleanNickname,
    });

    return { id: playerId, nickname: cleanNickname };
  },
});
