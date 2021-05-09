# replicasetmongo

Requisitos de Software para la Demo
Ubuntu 20.0.4
Docker version 20.10.6
MongoDB version 4.4.5
Intalación
En el archivo /etc/hosts definir:
127.0.0.1	mongodb1
127.0.0.1	mongodb2
127.0.0.1	mongodb3
Listar las redes habilitadas
docker network ls
Crear una red para los nodos
docker network create mongo-network
Levantar el nodo mongodb1 en la red mongo-network y con replica set rs0
docker run --name  mongodb1 --net mongo-network -p 27021:27017 -d mongo:4.4.5 mongod --replSet rs0
Levantar el nodo mongodb2 en la red mongo-network y con replica set rs0
docker run --name  mongodb2 --net mongo-network -p 27022:27017 -d mongo:4.4.5 mongod --replSet rs0
Levantar el nodo mongodb3 en la red mongo-network y con replica set rs0
docker run --name  mongodb3 --net mongo-network -p 27023:27017 -d mongo:4.4.5 mongod --replSet rs0
Ingresar al nodo mongodb1
docker exec -ti mongodb1 mongo
Crear la configuración con los 3 miembros
config = { "_id" : "rs0", "members" : [ {"_id" : 0, "host" : "mongodb1:27017" }, { "_id" : 1, "host" : "mongodb2:27017" }, { "_id" : 2, "host" : "mongodb3:27017" } ] }
Beautify:
config = { 
 "_id": "rs0",
   "members": [{
       "_id": 0,
       "host": "mongodb1:27017"
   }, {
       "_id": 1,
       "host": "mongodb2:27017"
   }, {
       "_id": 2,
       "host": "mongodb3:27017"
   }]
}
Iniciar el replica set
rs.initiate(config)
Ver el estado del replica set
rs.status(config)

