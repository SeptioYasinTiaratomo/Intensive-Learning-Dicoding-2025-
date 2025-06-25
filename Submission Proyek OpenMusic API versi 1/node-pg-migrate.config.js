require('dotenv').config();

module.exports = {
  direction: 'up',
  migrationsTable: 'pgmigrations',
  dir: 'migrations',
  databaseUrl: {
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    database: process.env.PGDATABASE,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
  },
};
