import graphql = require("graphql");
import _ = require("lodash");

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

let messages = [
  { message: "holla at ya girl", id: "1" },
  { message: "is it me or is it hot in here", id: "2" },
  { message: "i like those red shoes", id: "3" }
];

const MessageType = new GraphQLObjectType({
  name: "Message",
  fields: () => ({
    id: { type: GraphQLString },
    message: { type: GraphQLString }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    messages: {
      type: new GraphQLList(MessageType),
      resolve(parents, args) {
        return messages;
      }
    }
  }
});

export default new GraphQLSchema({
  query: RootQuery
});
