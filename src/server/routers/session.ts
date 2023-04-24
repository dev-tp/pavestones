import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { procedure, router } from '../trpc';
import { User } from '../../lib/session';

export const sessionRouter = router({
  login: procedure
    .input(z.object({ username: z.string() }))
    .mutation(async ({ ctx, input }) => {
      try {
        ctx.session.user = { isLoggedIn: true, username: input.username };
        await ctx.session.save();
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: (error as Error).message,
        });
      }
    }),
  logout: procedure.mutation(async ({ ctx }) => {
    ctx.session.destroy();
    return {} as User;
  }),
  user: procedure.query(async ({ ctx }) => {
    if (ctx.session.user) {
      return { ...ctx.session.user, isLoggedIn: true };
    }

    return {} as User;
  }),
});
