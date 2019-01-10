// Update with your config settings.
require('dotenv').config()

module.exports = {
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    acquireConnectionTimeout: 10000,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tablename: 'knex_migrations'
    }
  }
};