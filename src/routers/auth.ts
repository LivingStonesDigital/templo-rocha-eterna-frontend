import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import z from "zod";



export const authRouter = createTRPCRouter({
  login: baseProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.pb.collection("users").authWithPassword(input.email, input.password);  
    })
});