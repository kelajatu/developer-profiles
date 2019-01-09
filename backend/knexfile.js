// Update with your config settings.
require('dotenv').config()

module.exports = {
  development: {
    client: 'mysql',
    version: '5.6.41',
    connection: {
      host : process.env.RDS_HOSTNAME,
      port     : process.env.RDS_PORT,
      user : process.env.RDS_USERNAME,
      password : process.env.RDS_PASSWORD,
      database : 'devProfiles_dbName'
    },
    pool: {
      min: 2,
      max: 10
    },
  useNullAsDefault: true,
},

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
};
