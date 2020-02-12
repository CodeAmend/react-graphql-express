import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import './App.css';

import { ALL_RECIPES } from '../queries';

function App() {

  const { loading, error, data } = useQuery(ALL_RECIPES);
  console.log({ loading, error, data });


  return (
    <div className="App">
      Home
    </div>
  );
}

export default App;
