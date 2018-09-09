require("dotenv").config();
const { Client } = require("pg");

const jbeach = async () => {
  const client = new Client();
  await client.connect();
  const res = await client.query(
    "INSERT INTO messages (message_body) VALUES ('young meat sandwich is good');"
  );
  console.log(res);
  await client.end();
};

jbeach();

const youngdong = async () => {
  const client = new Client();
  await client.connect();
  const res = await client.query("SELECT message_body FROM messages");
  console.log(res);
  await client.end();
};

youngdong();
