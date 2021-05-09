 #!/bin/bash 

 docker network ls

 docker network create mongo-network

docker run --name  mongodb1 --net mongo-network -p 27021:27017 -d mongo:4.4.5 mongod --replSet rs0

docker run --name  mongodb2 --net mongo-network -p 27022:27017 -d mongo:4.4.5 mongod --replSet rs0

docker run --name  mongodb3 --net mongo-network -p 27023:27017 -d mongo:4.4.5 mongod --replSet rs0

docker ps

