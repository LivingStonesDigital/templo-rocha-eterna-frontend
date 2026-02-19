import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { z } from "zod";
import webpush from "web-push";

webpush.setVapidDetails(
  "mailto:stonedigitalliving@gmail.com",
  process.env.VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
);

export const notificationRouter = createTRPCRouter({
  subscribe: baseProcedure
    .input(
      z.object({
        user_id: z.string(),
        subscription: z.object({
          endpoint: z.string(),
          keys: z.object({
            p256dh: z.string(),
            auth: z.string(),
          }),
        }),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { user_id, subscription } = input;

      try {
        const existing = await ctx.pb
          .collection("notifications")
          .getFirstListItem(`user_id="${user_id}"`);

        return await ctx.pb.collection("notifications").update(existing.id, {
          endpoint: subscription.endpoint,
          p256dh: subscription.keys.p256dh,
          auth: subscription.keys.auth,
        });
      } catch {
        return await ctx.pb.collection("notifications").create({
          user_id,
          endpoint: subscription.endpoint,
          p256dh: subscription.keys.p256dh,
          auth: subscription.keys.auth,
        });
      }
    }),

  send: baseProcedure
    .input(
      z.object({
        user_id: z.string(),
        title: z.string(),
        message: z.string(),
        icon: z.string().optional(),
        url: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const record = await ctx.pb
        .collection("notifications")
        .getFirstListItem(`user_id="${input.user_id}"`);

      const subscription = {
        endpoint: record.endpoint,
        keys: {
          p256dh: record.p256dh,
          auth: record.auth,
        },
      };

      try {
        await webpush.sendNotification(
          subscription,
          JSON.stringify({
            title: input.title,
            body: input.message,
            icon: input.icon ?? "/icon-192.png",
            data: {
              url: input.url ?? "/dashboard",
            },
          })
        );

        return { success: true };
      } catch (error: any) {
        // 🔥 Se subscription expirou
        if (error.statusCode === 410 || error.statusCode === 404) {
          await ctx.pb.collection("notifications").delete(record.id);
        }

        throw new Error("Failed to send notification");
      }
    }),

  unsubscribe: baseProcedure
    .input(z.object({ user_id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const record = await ctx.pb
        .collection("notifications")
        .getFirstListItem(`user_id="${input.user_id}"`);

      await ctx.pb.collection("notifications").delete(record.id);

      return { success: true };
    }),
});
