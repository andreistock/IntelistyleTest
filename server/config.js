//This file sets up the configurations of the database and the connection

var pg = require('pg');

var config = {
    user: 'deployer', // env var: PGUSER
    database: 'garmentdata', // env var: PGDATABASE
    password: 'passworddeploy', // env var: PGPASSWORD
    host: 'localhost', // Server hosting the postgres database
    port: 5432, // env var: PGPORT
    max: 10, // max number of clients in the pool
    idleTimeoutMillis: 30000 // how long a client is allowed to remain idle before being closed
}

const pool = new pg.Pool(config)

module.exports = { pool }
