import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import RecipeItem from './Recipe/RecipeItem';

import { GET_ALL_RECIPES } from '../queries'


function App() {
  const { loading, error, data } = useQuery(GET_ALL_RECIPES);

  if (loading) return <div>Loading</div>

  if (error) return <div>Error</div>

  const { getAllRecipes } = data;

  return (
    <div className="App">
      <h1>Home</h1>
      <ul>
        {getAllRecipes && getAllRecipes.map(recipe => (
          <RecipeItem key={recipe.id} {...recipe} />
        ))}
      </ul>
    </div>
  );
}

export default App;
