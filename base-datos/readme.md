# GraphQL con Node.js
Aqui están las instrucciones para crear la BD que usaremos en la práctica

## Creamos un contenedor con MariaDB
```bash
# creamos un volumen para nuestra BD
$ docker volume create demo-graphql-nodejs

# creamos un red
$ docker network create demo-graphql-nodejs

# corremos un contenedor con nuestro servidor de BD 
$ docker run \
  -d \
  --name mariadb-graphql-nodejs \
  --restart on-failure:5 \
  -e MYSQL_ROOT_PASSWORD=secr3t \
  -e MYSQL_USER=usuario \
  -e MYSQL_PASSWORD=secr3t \
  --mount type=volume,source=demo-graphql-nodejs,target=/var/lib/mysql \
  --network=demo-graphql-nodejs \
  -p 3306:3306 \
  yobasystems/alpine-mariadb
```
# Poblamos la BD
Vamos a cear un contenedor efímero para acceder a nuestro servidor, también montamos en el el archivo que usaremos para poblar la BD
```bash
$ docker run -it --rm \
  --mount type=bind,source=${PWD}/fulldb.sql,target=/tmp/fulldb.sql \
  --network=demo-graphql-nodejs \
  --entrypoint sh \
  yobasystems/alpine-mariadb
```

Accedemos a nuestro servidor
```bash
/ # mysql -h mariadb-graphql-nodejs -uroot -psecr3t
```
Creamos un schema
```bash
MariaDB [(none)]> create database graphql_nodejs;
```
Damos permiso a nuestro usuario
```bash
MariaDB [(none)]> grant all on graphql_nodejs.* to "usuario" identified by "secr3t";
```
Confirmamos los permisos
```bash
MariaDB [(none)]> flush privileges;
```
Nos posicionamos en el eschema que creamos.
```bash
MariaDB [(none)]> use graphql_nodejs;
```
Importamos los datos
```bash
MariaDB [graphql_nodejs]> \. /tmp/fulldb.sql
```
Verificamos que los datos fueron importados correctamente
```bash
MariaDB [graphql_nodejs]> show tables;
+--------------------------+
| Tables_in_graphql_nodejs |
+--------------------------+
| authors                  |
| posts                    |
+--------------------------+
2 rows in set (0.000 sec)

MariaDB [graphql_nodejs]> select count(*) from authors;
+----------+
| count(*) |
+----------+
|      100 |
+----------+
1 row in set (0.000 sec)

MariaDB [graphql_nodejs]> select count(*) from posts;
+----------+
| count(*) |
+----------+
|     5000 |
+----------+
1 row in set (0.002 sec)

MariaDB [graphql_nodejs]> describe authors;
+------------+--------------+------+-----+---------------------+----------------+
| Field      | Type         | Null | Key | Default             | Extra          |
+------------+--------------+------+-----+---------------------+----------------+
| id         | int(11)      | NO   | PRI | NULL                | auto_increment |
| first_name | varchar(50)  | NO   |     | NULL                |                |
| last_name  | varchar(50)  | NO   |     | NULL                |                |
| email      | varchar(100) | NO   | UNI | NULL                |                |
| birthdate  | date         | NO   |     | NULL                |                |
| added      | timestamp    | NO   |     | current_timestamp() |                |
+------------+--------------+------+-----+---------------------+----------------+
6 rows in set (0.001 sec)

MariaDB [graphql_nodejs]> describe posts;
+-------------+--------------+------+-----+---------+----------------+
| Field       | Type         | Null | Key | Default | Extra          |
+-------------+--------------+------+-----+---------+----------------+
| id          | int(11)      | NO   | PRI | NULL    | auto_increment |
| author_id   | int(11)      | NO   |     | NULL    |                |
| title       | varchar(255) | NO   |     | NULL    |                |
| description | varchar(500) | NO   |     | NULL    |                |
| content     | text         | NO   |     | NULL    |                |
| date        | date         | NO   |     | NULL    |                |
+-------------+--------------+------+-----+---------+----------------+
6 rows in set (0.001 sec)
```
Salimos totalmente
```bash
MariaDB [(none)]> exit
$ exit
```

Listo, ya tenemos la base de datos necesaria para nuestro ejercicio
