#!/bin/bash

if [ "$1" == "dev" ]; then
  echo "Running docker-compose with docker-compose.dev.yaml"
  docker-compose -f docker-compose.dev.yaml up --build
else
  echo "Running docker-compose with docker-compose.prod.yaml"
  docker-compose -f docker-compose.prod.yaml up --build
fi
