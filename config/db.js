const { neon } = require("@neondatabase/serverless");
require("dotenv").config();

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;

// Initialize Neon database connection
const sql = neon(
    `postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?ssl=true`
);

module.exports = { sql };