import { z } from 'zod';
import { baseProcedure, createTRPCRouter } from '../init';
import { notificationRouter } from '@/routers/notification';
import { authRouter } from '@/routers/auth';
import { membrosRouter } from '@/routers/membros';


export const appRouter = createTRPCRouter({
  auth: authRouter,
  notification: notificationRouter,
  membros: membrosRouter
});
// export type definition of API
export type AppRouter = typeof appRouter;