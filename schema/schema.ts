import graphql = require("graphql");
var pg = require("pg");
const { Client } = require("pg");
require("dotenv").config();
import models = require(".././models/index.js");
const knexConfig = require("../db/knex");
const knex = require("knex")(knexConfig);
const keys = require('../config/keys');


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

const GoogleUserType = new GraphQLObjectType({
  name: "GoogleUser",
  fields: () => ({
    id: { type: GraphQLString },
    email: { type: GraphQLString },
    name: { type: GraphQLString },
    short_description: { type: GraphQLString }
  })
});


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
    },
    profile: {
      type: GoogleUserType,
      async resolve(parents, args, ctx) {
        console.log(ctx.req.user)
        const lebron = ctx.req.user[0];
        const shit = await knex.select().table('google_users').where({ id: lebron.id });
        console.log('shit', shit)
        let cow = shit[0]
        return cow
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