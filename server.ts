import express = require("express");
import cors = require("cors");
import graphqlHTTP = require("express-graphql");
import schema = require("./schema/schema");

const server = express();
server.use(cors());

// Need Database Connection

// Binding express with graphql

server.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

server.listen(4000, () => {
  console.log("express is listening for requests on port 4000");
});
