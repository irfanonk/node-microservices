#!/bin/bash

if [ "$1" == "dev-stop" ]; then
  echo "stoping docker-compose with docker-compose.dev.yaml"
  docker-compose -f docker-compose.dev.yaml down --remove-orphans -v
  exit 0
fi  

if [ "$1" == "prod-stop" ]; then
  echo "stoping docker-compose with docker-compose.prod.yaml"
  docker-compose -f docker-compose.prod.yaml down --remove-orphans -v
  exit 0
fi


if [ "$1" == "dev" ]; then
  echo "Running docker-compose with docker-compose.dev.yaml"
  docker-compose -f docker-compose.dev.yaml up --build
  exit 0
fi

if [ "$1" == "prod" ]; then
  echo "Running docker-compose with docker-compose.prod.yaml"
  docker-compose -f docker-compose.prod.yaml up --build
  exit 0
fi
