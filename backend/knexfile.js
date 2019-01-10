// Update with your config settings.
require('dotenv').config()

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './dev.sqlite3'
    },
    useNullAsDefault: true,
  },

  amazon: {
    client: 'mysql',
    version: '5.6.41',
    connection: {
      host : process.env.RDS_HOSTNAME,
      port     : process.env.RDS_PORT,
      user : process.env.RDS_USERNAME,
      password : process.env.RDS_PASSWORD,
      database : process.env.RDS_DB_NAME
    },
    pool: {
      min: 2,
      max: 10
    },
    useNullAsDefault: true,
  },

  amazonPG: {
    client: 'pg',
    version: '10.4',
    connection: {
      host : '',
      port     : process.env.RDS_PORT,
      user : process.env.RDS_USERNAME,
      password : process.env.RDS_PASSWORD,
      database : 'dbname'
    },
    pool: {
      min: 2,
      max: 10
    },
    useNullAsDefault: true,
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    acquireConnectionTimeout: 10000,
    pool: {
      min: 2,
      max: 10
    }
  }
};