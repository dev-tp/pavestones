import { pavestoneRouter } from './pavestones';
import { router } from '../trpc';
import { sessionRouter } from './session';

export const appRouter = router({
  pavestones: pavestoneRouter,
  session: sessionRouter,
});

export type AppRouter = typeof appRouter;
