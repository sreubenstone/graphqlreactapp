console.log("hello, testing your horrific code");

var pg = require("pg");
require("dotenv").config();

// PostGres connection String defined
const connectionString = "postgres://localhost:5432/graphqlhack";
// import _ = require("lodash");
const pgp = require("pg-promise")();
const db = {
  conn: pgp(connectionString)
};

let query = `SELECT message_body FROM messages`;

async Messages(query){
    return await db.conn.many(query);
}


    

