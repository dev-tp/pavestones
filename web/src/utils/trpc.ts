import { createTRPCNext } from '@trpc/next';
import { httpBatchLink } from '@trpc/client';

import { AppRouter } from '../server/routers/_app';
import { transformer } from './transformer';

function getBaseUrl() {
  if (typeof window !== 'undefined') {
    return '';
  }

  return `http://localhost:${process.env.PORT ?? 3000}`;
}

export const trpc = createTRPCNext<AppRouter>({
  config() {
    return {
      links: [
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`,
        }),
      ],
      transformer,
    };
  },
});
