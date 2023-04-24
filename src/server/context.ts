import { getIronSession } from 'iron-session';
import * as next from '@trpc/server/adapters/next';
import * as trpc from '@trpc/server';

import { sessionOptions } from '../lib/session';

export type Context = trpc.inferAsyncReturnType<typeof createContext>;

export async function createContext(opts: next.CreateNextContextOptions) {
  return { session: await getIronSession(opts.req, opts.res, sessionOptions) };
}
