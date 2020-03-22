import React from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import { SEARCH_RECIPE } from '../../queries';
import RecipeItem from './RecipeItem';


const Search = () => {
  const [searchRecipeQuery, { data = {} }] = useLazyQuery(SEARCH_RECIPE);

  const handleSearchChange = event => {
    event.persist();
    searchRecipeQuery({
      variables: { searchTerm: event.target.value }
    });
  }

  const { searchRecipe = [] } = data;

  return (
    <div className="App">
      <h1>Search</h1>

      <input
        onChange={handleSearchChange}
        placeholder="Search for recipes"
        type="search"
      />

      <ul>
        {searchRecipe.map(recipe => (
          <RecipeItem key={recipe._id} {...recipe} />
        ))}
      </ul>
    </div>
  );
}

export default Search;
