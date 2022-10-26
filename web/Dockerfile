FROM node:alpine

WORKDIR /root/

COPY ./ /root/

RUN yarn
RUN yarn build

FROM node:alpine

WORKDIR /root/

COPY --from=0 /root/.env.local /root/.env.local
COPY --from=0 /root/.next/ /root/.next/
COPY --from=0 /root/node_modules/ /root/node_modules/
COPY --from=0 /root/package.json /root/package.json
COPY --from=0 /root/public/ /root/public/

CMD [ "npm", "start" ]
