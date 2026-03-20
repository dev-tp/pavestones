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

FROM alpine AS certificates

WORKDIR /tmp/certificates

RUN apk add --no-cache openssl

RUN openssl ecparam -genkey -name secp384r1 -out server.key
RUN openssl req -new -key server.key -subj '/C=US/ST=California/L=Los Angeles/CN=pavestones.olacathedral.org' -out server.csr
RUN openssl x509 -req -sha256 -days 365 -in server.csr -signkey server.key -out server.crt

FROM node

COPY --from=build /srv/.env .
COPY --from=build /srv/build ./build
COPY --from=build /srv/data ./data
COPY --from=build /srv/node_modules ./node_modules
COPY --from=build /srv/server.js .

COPY --from=certificates /tmp/certificates/server.crt .
COPY --from=certificates /tmp/certificates/server.key .

VOLUME /srv/data

EXPOSE 443

CMD ["node", "--env-file=.env", "server.js"]
