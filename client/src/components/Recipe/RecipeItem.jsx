import React from 'react';
import { NavLink } from 'react-router-dom';


const RecipeItem = ({ _id, name, likes, category }) => (
  <li>
    <NavLink to={`/recipe/${_id}`}>
      <h4>{name}</h4>
    </NavLink>
    <p>
      <strong>Category: </strong>
      {category}
    </p>
    <p>
      <strong>Likes: </strong>
      {likes}
    </p>
  </li>
);

export default RecipeItem;
