var pg = require("pg");
const { Client } = require("pg");
require("dotenv").config();

// const user = models.FbAuth.build({
//   fb_id: 1,
//   displayname: "johnbichon"
// });

// user.save();

// const message = models.Message.build({
//   body: "life savers look good"
// });

// message.save();

// async function Adder() {
//   const user = models.FbAuth.build({
//     fb_id: 1,
//     displayname: "kk"
//   });
//   user.save();
// }

// Adder();

/* Setting Up Cookies with GraphQL

> Express Session
> https://github.com/benawad/node-ts-graphql-boilerplate/blob/10_session_express_middleware/src/index.ts




*/

// async function Shlong() {
//   const fbUsers = await models.FbAuth.findAll({
//     limit: 1,
//     where: { fb_id: 1 }
//   });

//   console.log(fbUsers);
// }

// Shlong();

// console.log(models.Message);

// models.Message.findAll().then(function(messages) {
//   console.log(messages);
// });

// const message = models.message.build({
//   body: "shfgh"
// });

// message.save().then(function(newMessage) {
// });

// require("dotenv").config();
// const { Client } = require("pg");

// const jbeach = async () => {
//   const client = new Client();
//   await client.connect();
//   const res = await client.query(
//     "INSERT INTO messages (message_body) VALUES ('young meat sandwich is good');"
//   );
//   console.log(res);
//   await client.end();
// };

// jbeach();

// const youngdong = async () => {
//   const client = new Client();
//   await client.connect();
//   const res = await client.query("SELECT message_body FROM messages");
//   console.log(res);
//   await client.end();
// };

// youngdong();
