import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import { Wrapper } from './Common/styles';
import RecipeItem from './Recipe/RecipeItem';
import Loader from './Common/Loader';
import Error from './Common/Error';

import { GET_ALL_RECIPES } from '../queries'

function App() {
  const { loading, error, data } = useQuery(GET_ALL_RECIPES);

  if (loading) return <Loader />
  if (error) return <Error />

  const { getAllRecipes = [] } = data;

  return (
    <Wrapper>
      <h1>Home</h1>
      <ul>
        {getAllRecipes.map(recipe => (
          <RecipeItem key={recipe._id} {...recipe} />)
        )}
      </ul>
    </Wrapper>
  );
}

export default App;
