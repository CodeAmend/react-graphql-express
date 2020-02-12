require('dotenv').config({ path: 'variables.env' });
const express = require('express');

require('./db');
const graphQLSetup = require('./graphql');


const { PORT } = process.env;

const app = express();
graphQLSetup(app);

app.listen(PORT, () => {
  console.log(`server listening on ${PORT}`);
});
