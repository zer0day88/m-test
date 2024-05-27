import type { Knex } from "knex";

// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
  

  development: {
    client: "postgresql",
    connection: {
      database: 'mtest',
      user: 'admin',
      password: '1234'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  },

};

module.exports = config;
