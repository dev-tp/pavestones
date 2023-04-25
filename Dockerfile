FROM alpine

WORKDIR /root

COPY ./ ./

RUN apk add npm
RUN npm install -g pnpm

RUN pnpm install
RUN pnpm build

FROM alpine

WORKDIR /root

COPY --from=0 /root/.env ./
COPY --from=0 /root/.next ./.next
COPY --from=0 /root/node_modules ./node_modules
COPY --from=0 /root/package.json ./
COPY --from=0 /root/prisma ./prisma
COPY --from=0 /root/public ./public
COPY --from=0 /root/src ./src

RUN apk add nodejs

CMD node node_modules/prisma/build/index.js generate; \
    node node_modules/prisma/build/index.js db push; \
    node node_modules/tsx/dist/cli.js prisma/seed.ts; \
    node node_modules/next/dist/bin/next start
