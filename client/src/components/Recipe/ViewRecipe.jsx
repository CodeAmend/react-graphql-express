import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import { GET_RECIPE } from '../../queries';

import Loader from '../Common/Loader';
import Error from '../Common/Error';


const ViewRecipe = ({ match }) => {
  const { id } = match.params;

  const { loading, error, data } = useQuery(GET_RECIPE, {
    variables: { id }
  });

  if (loading) return <Loader />;
  if (error) return <Error />;

  const handleLike = () => {
    console.log("HANDLE_LIKE");
  }

  const { getRecipe } = data;

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
