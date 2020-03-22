import React from 'react';
import { NavLink } from 'react-router-dom';

import { Recipe } from './styles';


const RecipeItemComponent = ({ _id, name, likes, category }) => (
  <Recipe.Item>
    <h4>
      Name:
      <NavLink to={`/recipe/${_id}`}>
        {' ' + name}
      </NavLink>
    </h4>
    <p>
      <strong>Category: </strong>
      {category}
    </p>
    <p>
      <strong>Likes: </strong>
      {likes}
    </p>
  </Recipe.Item>
);

export default RecipeItemComponent;
