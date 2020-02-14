const { ApolloServer } = require('apollo-server-express');
const { typeDefs } = require('./typeDefs');
const { resolvers } = require('./resolvers');


module.exports = ({ app, ...rest }) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    ...rest,
  });

  server.applyMiddleware({ app });
}
