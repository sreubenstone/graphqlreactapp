import graphql = require("graphql");
var pg = require("pg");
require("dotenv").config();

// PostGres connection String defined
const connectionString = "postgres://localhost:5432/graphqlhack";
// import _ = require("lodash");
const pgp = require("pg-promise")();
const db = {
  conn: pgp(connectionString)
};

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} = graphql;

//dummy data

// let messages = [
//   { message: "holla at ya girl", id: "1" },
//   { message: "is it me or is it hot in here", id: "2" },
//   { message: "i like those red shoes", id: "3" }
// ];

const MessageType = new GraphQLObjectType({
  name: "Message",
  fields: () => ({
    id: { type: GraphQLString },
    message: { type: GraphQLString }
  })
});

const RootQuery = new GraphQLObjectType({
  //
  name: "RootQueryType",
  fields: {
    messages: {
      type: new GraphQLList(MessageType),
      async resolve(parents, args) {
        let query = `SELECT message_body
        FROM messages`;
        return await db.conn.many(query);
        console.log(db.conn.many(query));
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addMessage: {
      type: MessageType,
      args: {
        message: { type: GraphQLString }
      },
      async resolve(parents, args) {
        const query = `INSERT INTO messages (message_body)
        VALUES ('${args.message}');`;
        return await db.conn.one(query);
      }
    }
  }
});

export default new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
