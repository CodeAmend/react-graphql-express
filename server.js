require('dotenv').config({ path: 'variables.env' });
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');

const Recipe = require('./models/Recipe');
const User = require('./models/User');

const { typeDefs } = require('./typeDefs');
const { resolvers } = require('./resolvers');

const { PORT, MONGO_URI } = process.env;

const server = new ApolloServer({ typeDefs, resolvers });

// Connects to Mongoose
const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(MONGO_URI, mongooseOptions)
  .then(() => console.log('DB connected'))
  .catch(err => console.error(err));

// Initialzes application

const app = express();
server.applyMiddleware({ app });

app.listen(PORT, () => {
  console.log(`server listening on ${PORT}`);
});
