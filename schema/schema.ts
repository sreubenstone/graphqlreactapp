import graphql = require("graphql");
var pg = require("pg");
const { Client } = require("pg");
require("dotenv").config();
import models = require(".././models/index.js");

interface Message {
  type: object;
}

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
    message: { type: GraphQLString, resolve: parent => parent.body }
  })
});

const RootQuery = new GraphQLObjectType({
  //
  name: "RootQueryType",
  fields: {
    messages: {
      type: new GraphQLList(MessageType),
      async resolve(parents, args) {
        const dong = await models.Message.findAll();
        console.log("dong", dong);
        const nodes = dong.map(node => node.dataValues);
        console.log("map of dong", nodes);
        return nodes;
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
        const fuckenmessage = models.Message.build({
          body: args.message
        });
        return await fuckenmessage.save();
      }
    }
  }
});

export default new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
