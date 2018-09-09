var pg = require("pg");
require("dotenv").config();
//or native libpq bindings
//var pg = require('pg').native

var conString =
  process.env.CONNECTSTRING || "postgres://localhost:5432/graphqlhack";
var client = new pg.Client(conString);

async () => {
  await client.connect();
  return await client.query(
    "INSERT INTO messages (message_body) VALUES ('young meat sandwich is good');"
  );
  console.log(client.query);
  client.end();
};
