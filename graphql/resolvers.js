require('dotenv').config({ path: 'variables.env' });
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET; // 'secret-key';

const createToken = (user, secret, expiresIn) => {
  const { username, email } = user;

  return jwt.sign({ username, email }, secret, { expiresIn });
}

exports.resolvers = {
  Query: {
    allRecipes: async (root, args, { models }, info) => {
      const { Recipe } = models;
      const recipes = await Recipe.find();
      return recipes;
    }
  },

  Mutation: {
    addRecipe: async (root, args, { models }, info) => {
      const { name, category, description, instructions, username } = args;
      const { Recipe } = models;

      const newRecipe = await new Recipe({
        name, category, description, instructions, username,
      }).save();

      return newRecipe;
    },

    signupUser: async (root, args, { models }, info) => {
      const { username, email, password } = args;
      console.log({ args });
      const { User } = models;

      const user = await User.findOne({ username });

      if (user) {
        throw new Error('User already exists');
      }

      const newUser = await new User({ username, password, email }).save();

      const expiresIn = 1000 * 60 * 1;
      const token = createToken({ username, password }, SECRET, expiresIn);

      return { token };
    }
  },

}
