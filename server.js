require('dotenv').config({ path: 'variables.env' });
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const jwt = require('jsonwebtoken');

const { models } = require('./db');
const { typeDefs } = require('./graphql/typeDefs');
const { resolvers } = require('./graphql/resolvers');
const { PORT } = process.env;
const app = express();

const SECRET = process.env.SECRET;


const gqlServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: { models }
});


app.use(async (req, _, next) => {
  const token = req.headers['authorization'];
  if (token !== null {
    jwt.verify(token, SECRET);
  }
  next();
});

gqlServer.applyMiddleware({ app });


app.listen(PORT, () => {
  console.log(`server listening on ${PORT}`);
});
