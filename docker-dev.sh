#!/usr/bin/env bash

PROJECT_PREFIX="itufundes-"
NETWORK_NAME="${PROJECT_PREFIX}network-bridge"
CONTAINER_API="${PROJECT_PREFIX}api"
CONTAINER_UI="${PROJECT_PREFIX}ui"
CONTAINER_MONGODB="${PROJECT_PREFIX}mongodb"

NORMAL_COLOR="\\033[0;39m"
LOG_COLOR="\\033[1;32m"
LOG_SMALL_COLOR="\\033[1;34m"

log() {
  printf "\n${LOG_COLOR}>>> $1${NORMAL_COLOR}\n"
}

log_small() {
  printf "${LOG_SMALL_COLOR}> $1${NORMAL_COLOR}\n"
}

docker_stats() {
  log_small containers
  docker ps -a

  log_small images
  docker images

  log_small networks
  docker network ls

  log_small volumes
  docker volume ls
}

cleanup() {
  log_small "$1"
  docker stop "$1"
  docker rm -v "$1"
}

cleanup_network() {
  log_small $NETWORK_NAME
  docker network rm "$NETWORK_NAME"
}

create_network() {
  log_small $NETWORK_NAME
  docker network create --driver bridge "$NETWORK_NAME"
}

create_api() {
  log_small $CONTAINER_API
  docker create \
    --name $CONTAINER_API \
    --network=$NETWORK_NAME \
    -v `pwd`/api:/app \
    -w /app \
    -p 3000:3000 \
    -e APP_CONF_KOA_JWT_KEY='JWT-DEV-KEY-XiJklw03JFmsjwDjt' \
    node:7.7 \
    npm run dev
}

create_ui() {
  log_small $CONTAINER_UI
  docker create \
    --name $CONTAINER_UI \
    --network=$NETWORK_NAME \
    -v `pwd`/ui:/app \
    -w /app \
    -p 80:3000 \
    -p 3030:3030 \
    -e APP_CONF_API_FRNT_URL='http://localhost:3000' \
    -e APP_CONF_API_BACK_URL='http://itufundes-api:3000' \
    node:7.7 \
    npm run dev
}

create_mongodb() {
  log_small $CONTAINER_MONGODB
  docker create \
    --name $CONTAINER_MONGODB \
    --network=$NETWORK_NAME \
    mongo:3.4
}

log Cleanup
cleanup $CONTAINER_API
cleanup $CONTAINER_UI
cleanup $CONTAINER_MONGODB
cleanup_network

log Build
create_network
create_api
create_ui
create_mongodb

log Start
docker start $CONTAINER_API
docker start $CONTAINER_UI
docker start $CONTAINER_MONGODB

log Stats
docker_stats

