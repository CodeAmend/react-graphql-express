import React from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import styled from 'styled-components';

import { SEARCH_RECIPE } from '../../queries';

import { Wrapper } from '../Common/styles';
import RecipeItem from './RecipeItem';

const SearchInput = styled.input`
  font-size: 3rem;
  transition: width 0.2s ease-in;
  margin: 2em;
  width: 10em;

  &:focus {
    width: 12em;
  }
`;


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
    <Wrapper>
      <h1>Search</h1>

      <SearchInput
        onChange={handleSearchChange}
        placeholder="Search for recipes"
        type="search"
      />

      <ul>
        {searchRecipe.map(recipe => (
          <RecipeItem key={recipe._id} {...recipe} />
        ))}
      </ul>
    </Wrapper>
  );
}

export default Search;
