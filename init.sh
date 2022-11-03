#!/usr/bin/env bash

echo "# Stop everything"
docker-compose down --remove-orphans

echo "# Remove all volumes"
docker volume rm "${PWD##*/}_mariadb" || true


echo "# Build Kotlin backend using maven"
mvn package

echo "# Build frontend container"
docker-compose build

echo "# start docker-compose env"
docker-compose pull
docker-compose up -d

echo "<= done"
echo "Open http://localhost"
