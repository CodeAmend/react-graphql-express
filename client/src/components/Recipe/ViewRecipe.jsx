import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import { GET_RECIPE } from '../../queries';


const ViewRecipe = ({ match }) => {
  const { id } = match.params;

  const getRecipeQuery = useQuery(GET_RECIPE, {
    variables: { id }
  });

  if (getRecipeQuery.loading) return <div>Loading</div>;
  if (getRecipeQuery.error) return <div>Error</div>;

  const handleLike = () => {
    console.log("HANDLE_LIKE");
  }

  const { getRecipe } = getRecipeQuery.data;

  return (
    <div className="App">
      <h1>{getRecipe.name}</h1>
      <p>Author: {getRecipe.username}</p>
      <p>{getRecipe.createdDate}</p>
      <p>Likes: {getRecipe.likes}</p>
      <p>Category: {getRecipe.category}</p>
      <p>{getRecipe.description}</p>
      <p>{getRecipe.instructions}</p>
      <button onClick={handleLike}>Like</button>
    </div>
  )
}

export default ViewRecipe;
