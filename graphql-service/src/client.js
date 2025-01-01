const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.POSTGRES_HOST,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  port: process.env.POSTGRES_PORT,
  max: 10, // Max number of clients in the pool
  idleTimeoutMillis: 30000, // Time before an idle client is closed
  connectionTimeoutMillis: 2000, // Max wait time for a connection from the pool
});

module.exports = pool;
