var pg = require("pg");
require("dotenv").config();
//or native libpq bindings
//var pg = require('pg').native

var conString =
  process.env.CONNECTSTRING || "postgres://localhost:5432/graphqlhack";

var client = new pg.Client(conString);
client.connect(function(err) {
  if (err) {
    return console.error("could not connect to postgres", err);
  }
  client.query("SELECT message_body FROM messages", function(err, result) {
    if (err) {
      return console.error("error running query", err);
    }
    console.log(result);

    client.end();
  });
});
