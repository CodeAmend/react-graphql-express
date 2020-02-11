require('dotenv').config({ path: 'variables.env' });
const mongoose = require('mongoose');
const express = require('express');

const Recipe = require('./models/Recipe');
const User = require('./models/User');

const { PORT, MONGO_URI } = process.env;

const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(MONGO_URI, mongooseOptions)
  .then(() => console.log('DB connected'))
  .catch(err => console.error(err));

// Initialzes application
const app = express();

app.listen(PORT, () => {
  console.log(`server listening on ${PORT}`);
});
