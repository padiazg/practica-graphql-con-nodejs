# GraphQL con Node.js
Charla introductoria sobre como usar GraphQL con Node.js. 
En este repositorio encontrarán el código usado en la demostración

# Como correr el proyecto
Todo se hará en una terminal del SO
## 1. Instalar la BD 
Posicionese en la carpeta `base-datos`, luego instale la BD siguiendo las indicaciones en [base-datos/readme.md](base-datos/readme.md)

## 2. Instale los módulos necesarios
Posicionese en la carpeta `practica` y ejecute
```bash
$ docker run --rm -it \
  --mount type=bind,source=${PWD},target=/app \
  node:alpine \
  sh -c "cd /app && npm i"
```

## 3. Ejecute el proyecto
Nos posicionamos en la carpeta `practica`

Los datos de conexión a la BD están en el archivo `.env`
```ini
DB_USER='usuario'
DB_PASS='secr3t'
DB_NAME='graphql_nodejs'
DB_HOST='mariadb-graphql-nodejs'
```

Luego ejecute esto
```bash
docker run --rm -it \
  --mount type=bind,source=${PWD},target=/app \
  --name=demo-graphql-nodejs \
  --network=demo-graphql-nodejs \
  -p 3001:3001 \
  node:alpine \
  sh -c "cd /app && DEBUG=*,-express*,-nodemon* npm run dev" 
```

# Acceda a la BD desde el CLI
```bash
$ docker run -it --rm  \
  --network=demo-graphql-nodejs \
  --entrypoint sh \
  yobasystems/alpine-mariadb

/ # mysql -h mariadb-graphql-nodejs -uusuario -psecr3t
```