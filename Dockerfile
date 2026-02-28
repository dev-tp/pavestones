FROM alpine AS node

WORKDIR /srv

RUN apk add --no-cache nodejs

FROM node AS build

RUN apk add npm

COPY package.json .

RUN npm install

COPY . .

RUN npm run db:push -- --force
RUN npm run db:seed
RUN npm run build
RUN npm prune --omit=dev

FROM node

COPY --from=build /srv/*.db .
COPY --from=build /srv/.env .

COPY --from=build /srv/build ./build
COPY --from=build /srv/node_modules ./node_modules

EXPOSE 3000

CMD ["node", "--env-file=.env", "build/index.js"]
