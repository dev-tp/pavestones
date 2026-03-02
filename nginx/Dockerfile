FROM alpine AS nginx

RUN apk add --no-cache nginx

FROM nginx AS certificates

WORKDIR /tmp/certificates

RUN apk add openssl

RUN openssl ecparam -genkey -name secp384r1 -out server.key
RUN openssl req -new -key server.key -subj '/C=US/ST=California/L=Los Angeles/CN=pavestones.example.com' -out server.csr
RUN openssl x509 -req -sha256 -days 365 -in server.csr -signkey server.key -out server.crt

FROM nginx

COPY --from=certificates /tmp/certificates/server.crt /etc/nginx
COPY --from=certificates /tmp/certificates/server.key /etc/nginx

COPY . .

EXPOSE 443

CMD ["nginx", "-g", "daemon off;"]
