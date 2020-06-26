# Código de demostración

## Instalar módulos
```bash
$ docker run --rm -it \
--mount type=bind,source=${PWD},target=/app \
node:alpine \
sh -c "cd /app && npm i"
```

## Correr la aplicación
```bash
$ docker run --rm -it \
--mount type=bind,source=${PWD},target=/app \
--name=demo-graphql-nodejs \
--network=demo-graphql-nodejs \
-p 3001:3001 \
node:alpine \
sh -c "cd /app && npm run dev"
```