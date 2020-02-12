const { ApolloServer } = require('apollo-server-express');
const { typeDefs } = require('./typeDefs');
const { resolvers } = require('./resolvers');


module.exports = ({ app, context }) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context,
  });

  server.applyMiddleware({ app });
}
