// Update with your config settings.

module.exports = {
  development: {
    client: 'mysql',
    version: '5.6.41',
    connection: {
      host : 'instanceidentifier.crobak3t5x8z.us-east-2.rds.amazonaws.com',
      port     : '3306',
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
