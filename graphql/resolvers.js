require('dotenv').config({ path: 'variables.env' });
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const createToken = (user, expiresIn) => {
  const { username, email } = user;
  const SECRET = process.env.SECRET;

  return jwt.sign({ username, email }, SECRET, { expiresIn });
}

exports.resolvers = {
  Query: {
    allRecipes: async (_, __, { models }) => {
      const { Recipe } = models;
      const recipes = await Recipe.find();
      return recipes;
    },

    getCurrentUser: async (_, __, { models, currentUser }) => {
      if (!currentUser) return null;

      const { User } = models;
      const user = User.findOne({ username: currentUser.username })
        .populate({
          path: 'favorites',
          model: 'Recipe'
        });

      return user;
    }
  },

  Mutation: {
    addRecipe: async (_, args, { models }) => {
      const { name, category, description, instructions, username } = args;
      const { Recipe } = models;

      const newRecipe = await new Recipe({
        name, category, description, instructions, username,
      }).save();

      return newRecipe;
    },

    signupUser: async (_, args, { models }) => {
      const { username, email, password } = args;
      const { User } = models;

      const user = await User.findOne({ username });

      if (user) {
        throw new Error('User already exists');
      }

      await new User({ username, password, email }).save();

      const expiresIn = 1000 * 60 * 1;

      const token = createToken({ username, password }, expiresIn);

      return { token };
    },

    signinUser: async (_, args, { models }) => {
      const { username, password } = args;
      const { User } = models;

      const user = await User.findOne({ username });

      if (!user) {
        throw new Error("Not a valid username!");
      }

      const isValidPassword = await bcrypt.compare(password, user.password);

      if (!isValidPassword) {
        throw new Error("Not a valid password!");
      }

      const token = createToken(user, '1hr');
      return { token };
    }
  },
}
