import express = require("express");
import cors = require("cors");
require("dotenv").config();
import graphqlHTTP = require("express-graphql");
import schema from "./schema/schema";

const server = express();
server.use(cors());

// Binding express with graphql

server.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

server.listen(process.env.PORT, () => {
  console.log("express is listening for requests on port 4000");
});
