require('dotenv').config({ path: 'variables.env' });
const express = require('express');

const { models } = require('./db');
const graphQLSetup = require('./graphql');


const { PORT } = process.env;

const app = express();

graphQLSetup({
  app,
  context: { models }
});


app.listen(PORT, () => {
  console.log(`server listening on ${PORT}`);
});
