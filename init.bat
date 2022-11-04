echo "# Stop everything"
docker-compose down --remove-orphans

echo "# Remove all volumes"
docker volume rm "${PWD##*/}_mariadb" || true

echo "# Build frontend container"
docker-compose build angular

echo "# Build backend container"
docker-compose build backend

echo "# start docker-compose env"
docker-compose pull
docker-compose up -d

echo "<= done"
echo "Open http://localhost"