import { z } from 'zod';

import { prisma } from '../prisma';
import { procedure, router } from '../trpc';

const schema = z.object({
  patron: z.string(),
  dedicated_to: z.string(),
  x: z.number(),
  y: z.number(),
  is_deceased: z.boolean(),
});

export const pavestoneRouter = router({
  add: procedure.input(schema).mutation(async ({ input }) => {
    return await prisma.pavestone.create({
      data: input,
    });
  }),
  delete: procedure
    .input(schema.extend({ id: z.number() }))
    .mutation(async ({ input }) => {
      return await prisma.pavestone.delete({ where: { id: input.id } });
    }),
  list: procedure.query(async () => {
    return await prisma.pavestone.findMany();
  }),
  update: procedure
    .input(schema.extend({ id: z.number() }))
    .mutation(async ({ input }) => {
      const { id, ...data } = input;
      return await prisma.pavestone.update({
        data,
        where: { id },
      });
    }),
});
