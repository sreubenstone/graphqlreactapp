require("dotenv").config();
const { Client } = require("pg");

async () => {
  const client = new Client();
  await client.connect();
  const res = await client.query(
    "INSERT INTO messages (message_body) VALUES ('young meat sandwich is good');"
  );
  console.log(res);
  await client.end();
};
