import { initTRPC } from '@trpc/server';

import { Context } from './context';
import { transformer } from '../utils/transformer';

const trpc = initTRPC.context<Context>().create({
  errorFormatter: ({ shape }) => shape,
  transformer,
});

export const { mergeRouters, middleware, procedure, router } = trpc;
