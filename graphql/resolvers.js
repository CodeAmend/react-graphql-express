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
    }
  }
}
