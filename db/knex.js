// Update with your config settings.
const options = {
  development: {
    client: "pg",
    connection: "postgres://localhost:5432/graphqlhack",
    migrations: {
      directory: __dirname + "/db/migrations"
    },
    seeds: {
      directory: __dirname + "/db/seeds"
    }
  },
  production: {
    client: "pg",
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: __dirname + "/db/migrations"
    },
    seeds: {
      directory: __dirname + "/db/seeds/production"
    }
  }
};

const env = process.env.NODE_ENV ? process.env.NODE_ENV : "development";
module.exports = options[env];
