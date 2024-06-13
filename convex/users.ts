import { ConvexError, v } from "convex/values";
import { internalMutation, query } from "./_generated/server";

export const getTopUserByPodcastCount = query({
  args: {},
  handler: async (ctx, args) => {
    const user = await ctx.db.query("users").collect();

    const userData = await Promise.all(
      user.map(async (u) => {
        const podcasts = await ctx.db
          .query("podcasts")
          .filter((q) => q.eq(q.field("authorId"), u.authId))
          .collect();

        const sortedPodcasts = podcasts.sort((a, b) => b.views - a.views);

        return {
          ...u,
          totalPodcasts: podcasts.length,
          podcast: sortedPodcasts.map((p) => ({
            podcastTitle: p.podcastTitle,
            pocastId: p._id,
          })),
        };
      })
    );

    return userData.sort((a, b) => b.totalPodcasts - a.totalPodcasts);
  },
});

export const createUser = internalMutation({
  args: {
    authId: v.string(),
    email: v.string(),
    imageUrl: v.string(),
    name: v.string(),
  },
  handler(ctx, args) {},
});

export const updateUser = internalMutation({
  args: {
    authId: v.string(),
    imageUrl: v.string(),
    email: v.string(),
  },
  async handler(ctx, args) {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("authId"), args.authId))
      .unique();

    if (!user) {
      throw new ConvexError("User not found");
    }

    await ctx.db.patch(user._id, {
      imageUrl: args.imageUrl,
      email: args.email,
    });
  },
});

export const deleteUser = internalMutation({
  args: { authId: v.string() },
  async handler(ctx, args) {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("authId"), args.authId))
      .unique();

    if (!user) {
      throw new ConvexError("User not found");
    }

    await ctx.db.delete(user._id);
  },
});
