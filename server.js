require('dotenv').config({ path: 'variables.env' });
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const jwt = require('jsonwebtoken');

const { models } = require('./db');
const { typeDefs } = require('./graphql/typeDefs');
const { resolvers } = require('./graphql/resolvers');
const { PORT } = process.env;
const app = express();


const gqlServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const { currentUser } = req;
    return { models, currentUser };
  },
});

app.use((req, _, next) => {
  const token = req.headers['authorization'];
  let user = null;
  if (token !== "null" && token) {
    try {
      user = jwt.verify(token, process.env.SECRET);
    } catch(err) {
      console.error(err)
    }
  }
  req.currentUser = user;
  next();
});

gqlServer.applyMiddleware({
  app,
  cors: true,
  path: '/graphql',
});

app.listen(PORT, () => {
  console.log(`server listening on ${PORT}`);
});
