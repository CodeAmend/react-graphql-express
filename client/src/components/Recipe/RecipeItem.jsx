import React from 'react';
import { NavLink } from 'react-router-dom';


const RecipeItem = ({ _id, name, category }) => (
  <li key={_id}>
    <h4><NavLink to={`/recipe/${_id}`}>{name}</NavLink></h4>
    <p><strong>{category}</strong></p>
  </li>
);

export default RecipeItem;
