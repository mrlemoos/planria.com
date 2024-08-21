# checks if the docker is running
if [ "$(docker ps -q -f name=postgres)" ]; then
  # stops the docker containers
  echo "Postgres IS running. Stopping the docker containers with postgres..."
  docker compose down -f infra/docker/docker-compose.yaml
  echo "Docker container stopped."
fi

# ups the docker containers w/ postgres
docker compose -f infra/docker/docker-compose.yaml up -d
echo "Docker container w/ postgres up and running."