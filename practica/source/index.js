require('dotenv').config();
const debug = require("debug")("main");
const mysql = require('promise-mysql');

// setup express
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const restMiddleware = require("./rest-middleware");
const schema = require("./graphql-middleware");
const { ApolloServer } = require("apollo-server-express");

debug("Tratamos de conectarnos a la BD!");
mysql.createPool({
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    connectTimeout: 10000, // 10 seconds
    acquireTimeout: 10000, // 10 seconds
    waitForConnections: true,
    queueLimit: 0,
})
.then(async pool => {
    debug("Tenemos conexión a la BD!");

    console.log(await pool.query(`SELECT 1;`));

    app.use(bodyParser.json()); // parse application/json

    // inyectamos nuestra conexión a la bd
    app.use((req, _, next) => {
        debug("middleware | Inyectamos la conexión a la BD en req");
        req.pool = pool;
        next();
    });

    // rest endpoint
    app.use('/rest', restMiddleware);
    
    app.get('/', (req, res) => {
        debug(`Tenemos objeto pool? =>`, !!req.pool);
        res.status(200).end(`Hola mundo!`);
    }); // app.post('/' ...
    
    // agregamos el middleware de Apollo
    const server = new ApolloServer({
        schema,
        formatError: err => {
            debug(`/graphql => ${err.stack}`);
            return err;
        },

        context: async ({ req }) => ({ pool: req.pool })
        // tracing: true,
    }); // ApolloServer ...

    server.applyMiddleware({ app });

    app.listen(3001, function () {
        console.log('Servidor está corriendo en el puerto 3001');
    });
})
;


