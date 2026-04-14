#!/bin/sh

npm run set-commit

image='pavestones:latest'
docker build -t $image .

args=(
  --env-file .env
  --name pavestones
  --restart unless-stopped
  -d
  -p 8443:443
  $image
)

docker run "${args[@]}"
