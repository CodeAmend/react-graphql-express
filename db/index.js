require('dotenv').config({ path: 'variables.env' });
const mongoose = require('mongoose');

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

module.exports = {
  mongoose,
  models: { Recipe, User },
}
